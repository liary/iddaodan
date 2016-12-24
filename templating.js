const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
        if (opts.filters) {
            for(var f in opts.filters) {
                env.addFilter(f, opts.filter[f]);
            }
        }
        return env;
}

function templating(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.viewPath = '';
        ctx.render = function(view, model) {
            view = ctx.viewPath ? ctx.viewPath + '/' + view : view; 
            // var model = null;
            // if (typeof deal === 'function') {
            //     model = deal();
            // } else {
            //     model = deal;
            // }
            console.log(view)
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    }
}
// var env = createEnv('views', {
//     watch: true,
//     filters: {
//         hex: function(n) {
//             return '0x' + n.toString(16);
//         }
//     }
// })
// var s = env.render('hello.html', { name: 'dfk<script>alert("ddc")</script>' });
// console.log(s);

module.exports = templating;