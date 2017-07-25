require('babel-register')

const webpack = require('webpack');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./webpack.dev');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();


// Webpack developer
if (isDeveloping) {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({
    type: 'application/json'
}))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 4000;
app.listen(port, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});

