const fs = require('fs');
const requireDir = require('require-dir');
const api = require('./api');

function addRoutes(router, dir) {
    let routes = requireDir(dir), midPath;
    if (dir.startsWith('./')) {
        midPath = dir.substring(2, dir.length - 2);
    }
    api.each(routes, function(subRoutes, mainPath) {
        if (mainPath === '__') {
            mainPath = ''
        } else {
            mainPath = '/' + mainPath
        }
        api.each(subRoutes, function(subRoute, subPath) {
            if (typeof subRoute === 'function' || Array.isArray(subRoute)) {
                let sPath = subPath === '/' || subPath === '' ? '' : '/' + subPath,
                    path = mainPath.length == 0 ? sPath : mainPath + sPath;
                router.get(path, //subRoute
                    async (ctx, next) => {
                        ctx.viewPath = './pages' + (mainPath ? '/' + mainPath : '');
                        await subRoute(ctx, next);
                    }
                );
                console.log(`register ${path} mapping`);
            }
        });
    });
}

module.exports = function(dir) {
    let
        controllersDir = dir || './pages',
        router = require('koa-router')();
    addRoutes(router, controllersDir);
    return router.routes();
}