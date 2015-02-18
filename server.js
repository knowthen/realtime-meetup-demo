'use strict';
let http      = require('http'),
    koa       = require('koa'),
    router    = require('koa-router'),
    serve     = require('koa-static'),
    marko     = require('marko'),
    socketIo  = require('socket.io'),
    tessel    = require('./tessel'),
    alerts    = require('./alerts'),
    realtime  = require('./realtime');

let app, server, io;

app = koa();

app.use(serve(__dirname + '/public'));

app.use(router(app));

app.get('/', function *(){
  this.body = marko.load('./views/index.marko').stream();
  this.type = 'text/html';
});

server = http.Server(app.callback());

io = socketIo(server);

tessel.listen();

realtime.listen(io);

alerts.start();

server.listen(3000);