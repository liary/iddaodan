
const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const Sequelize = require('sequelize');
const config = require('./config');
const Routes = require('./routes/init');
const liveload = require('koa-liveload');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

app.use(liveload(__dirname, {
  includes: ['scss']
}))
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`)
});

// if (!isProduction) {
//     console.log('dev')
//     let staticFiles = require('./static-files');
//     app.use(staticFiles('/static/', __dirname + '/static/'));
// }
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static', __dirname + '/static'));
}
app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(Routes());

app.listen(3311);
console.log('now started at port 3311')