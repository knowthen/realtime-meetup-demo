'use strict';
let ws    = require('nodejs-websocket'),
    r     = require('./util/dash'),
    port  = 3001;

function listen(){
  ws.createServer(connectionHandler).listen(port);

  function connectionHandler(conn) {
      conn.on('text', function (data) {
        data = JSON.parse(data);
        if(data && data.event && data.record){
          recordMeasurement(data.event, data.record.measure);
        }
      });
      conn.on('close', function (code, reason) {
        console.log('Connection closed')
      });
    }
}

function handleError(err){
  console.log(err);
}

function recordMeasurement(table, measure){
  r.table(table)
    .insert({
      createdAt: r.now().toEpochTime(),
      measure: measure
    })
    .run()
    .then()
    .catch(handleError);
}

module.exports = {
  listen: listen
};