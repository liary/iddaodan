module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        console.log(email + ' -- ' + password)
        if (password === '123') {
            console.log('login')
            ctx.render('singnin-ok.html', {
                title: 'Sign In Ok',
                name: 'facewin'
            });
        } else {
            console.log('failed')
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
}