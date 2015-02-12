'use strict';
let koa    = require('koa'),
    router = require('koa-router'),
    serve  = require('koa-static'),
    marko  = require('marko'),
    // r      = require('./util/dash'),
    tessel = require('./tessel');

let app, server, io;

app = koa();

app.use(serve(__dirname + '/public'));

app.use(router(app));

app.get('/', function *(){
  this.body = marko.load('./views/index.marko').stream();
  this.type = 'text/html';
});

server = require('http').Server(app.callback());

io = require('socket.io')(server);

require('./realtime').setup(io);

tessel();

server.listen(3000);