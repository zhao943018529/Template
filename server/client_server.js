const path = require("path");
const express = require("express");
const httpProxy = require("http-proxy");
const serveStatic = require("serve-static");
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const webpack = require("webpack");

const app = express();
app.use('/', serveStatic(path.join(__dirname, "..", "build")));
app.use('/', serveStatic(path.join(__dirname, "..", "static")));

const targetUrl = "http://127.0.0.1:13893";

const proxy = httpProxy.createProxyServer({
    target:targetUrl,
});

app.use('/api',(req,res)=>{
    proxy.web(req,res,{target:targetUrl});
});

const compiler = webpack(webpackConfig);
app.use(WebpackDevMiddleware(compiler,{
    index:"index.html",
    lazy:false,
    publicPath:"/",
    stats:{colors: true},
}));
app.use(WebpackHotMiddleware(compiler));

app.listen(13892, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Success port:" + 13892);
    }
});





