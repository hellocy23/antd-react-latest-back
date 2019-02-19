const express = require('express');   //引入express
const bodyParser = require('body-parser');
const logger = require('morgan');
const mockList = require('./index');
// console.log('mockList: ', mockList);

const app = express();        //实例化express
app.use(bodyParser.json());
app.use(logger('dev'));

for(let key in mockList) {
    const keyArr = key.split(' ');
    const methods = keyArr[0];
    const url = keyArr[1];
    if(methods === 'GET') {
        app.get(url, mockList[key]);
    } else if(methods === 'POST') {
        app.post(url, mockList[key]);
    } else if(methods === 'PUT') {
        app.put(url, mockList[key]);
    } else if(methods === 'DELETE') {
        app.delete(url, mockList[key]);
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen('3000', () => {
    console.log('Mock server listening on port 3000!');
})