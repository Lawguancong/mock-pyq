
const proxy = require('http-proxy-middleware');
// import * as proxy from 'http-proxy-middleware'

console.log(proxy)

const Config = require('../mock')
const target = `http://${Config.serverPath}:${Config.serverPort}/`;


module.exports = (app) => {
    app.use(proxy([
        '/homeQuery',
        '/uploadPhoto',
        '/uploadVideo',
        '/uploadText',
        '/share/delete',
        '/share/edit',
    ], { target }));
};