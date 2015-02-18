'use strict';
let co      = require('co'),
    r       = require('./util/dash'),
    twilio  = require('twilio'),
    config  = require('./config'),
    client  = twilio(config.accountSid, config.authToken);

function start () {

  startChangeFeed('temperature', 'measure');
  startChangeFeed('humidity', 'measure');
  startChangeFeed('light', 'measure');
  startChangeFeed('sound', 'measure');

  function startChangeFeed(table, field){
    return r.table(table)
      .orderBy({index: r.desc('createdAt')})
      .limit(1)
      .changes()
      .run({cursor: true}, handleChanges(table, field));
  }

  function handleChanges(table, field){
    return function(err, cursor){
      if(err){
        console.log(err);
      }
      else{
        cursor.each(function(err, record){
          checkAlert(table, field, record);
        });
      }
    }
  }

  function findAlertRecords (table, lastMeasure, currentMeasure) {
    console.log(table, lastMeasure, currentMeasure)
    return r.table('alertRule')
      .filter(function(row){
        return row('table').eq(table)
                .and(
                    row('max').lt(currentMeasure).and(row('max').ge(lastMeasure))
                  .or(
                    row('min').gt(currentMeasure).and(row('min').le(lastMeasure))
                   )
                );
      }
    ).run();
  }

  function sendSms(from, to, message){
    to = to.replace(/\D/g,'');
    if(to.length >= 9 && to.length <= 10){
      return client.messages.create({
        body: message,
        to: to,
        from: from});
    }
  }

  function checkAlert(table, field, record){
    let lastMeasure, currentMeasure, smsResponse;
    if(record && record.old_val)
      lastMeasure = record.old_val[field]; 
    if(record && record.new_val)
      currentMeasure = record.new_val[field]; 
    if(!lastMeasure){
      lastMeasure = currentMeasure;
    }
    co(function *(){
      let alertRecords = yield findAlertRecords(table, lastMeasure, currentMeasure);
      for(let record of alertRecords){
        try{
          smsResponse = yield sendSms(config.twilioNumber, 
            record.phone, 
            table.toUpperCase() + ' ALERT!\nCurrent value: ' + currentMeasure);
        }
        catch(err){
          console.log(err);
        }
      }
    }).then()
    .catch(function(err){
      console.log(err)
    });
  }
}
module.exports = {
  start: start
}
