'use strict';
let ws    = require('nodejs-websocket'),
    r     = require('./util/dash'),
    events = require('events'),
    eventEmitter = new events.EventEmitter(),
    port  = 3001;

function start(){
  ws.createServer(connectionHandler).listen(port);

  function connectionHandler(conn) {
      conn.on('text', function (data) {
        data = JSON.parse(data);
        eventEmitter.emit(data.event, data.record)
      });
      conn.on('close', function (code, reason) {
          console.log('Connection closed')
      });
    }
}

eventEmitter.on('temperature', temperatureHandler);
eventEmitter.on('humidity', humidityHandler);
eventEmitter.on('light', lightHandler);
// register soundhandler
eventEmitter.on('sound', soundHandler);

function handleError(err){
  console.log(err);
}

function temperatureHandler (record) {
  r.table('temperature')
    .insert({
      createdAt: r.now().toEpochTime(),
      temperature: record.temperature
    })
    .run()
    .then()
    .catch(handleError);
}

function humidityHandler (record) {
  r.table('humidity')
    .insert({
      createdAt: r.now().toEpochTime(),
      humidity: record.humidity
    })
    .run()
    .then()
    .catch(handleError);
}

function lightHandler (record) {
  r.table('light')
    .insert({
      createdAt: r.now().toEpochTime(),
      lightLevel: record.lightLevel
    })
    .run()
    .then()
    .catch(handleError);
}
// handle sound event
function soundHandler (record) {
  r.table('sound')
    .insert({
      createdAt: r.now().toEpochTime(),
      soundLevel: record.soundLevel
    })
    .run()
    .then()
    .catch(handleError);
}

module.exports = start;