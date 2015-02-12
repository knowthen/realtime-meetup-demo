'use strict';
let r = require('./util/dash');

function setup(io){
  io.on('connection', function(socket){
    // let cursor;
    // create delete handler
    socket.on('delete', function(data, cb){
      let table, id;
      table = data.table;
      id = data.id;
      r.table(table)
        .get(id)
        .delete()
        .run(cb);
    });
    // create add handler
    socket.on('add', function(data, cb){
      let table, record;
      table = data.table;
      record = data.record;
      record.createdAt = r.now().toEpochTime();
      r.table(table)
        .insert(record)
        .run(function(err, result){
          if(err){
            cb(err);
          }
          else{
            record.id = result.generated_keys[0];
            cb(null, record);
          }
        });
    });
    // create update handler
    socket.on('update', function(data, cb){
      let table, id, record;
      table = data.table;
      id = data.id;
      record = data.record;
      r.table(table)
        .get(id)
        .update(record)
        .run(cb);
    });
    
    socket.on('changes:start', function(data){
      let table, limit, filter;
      table = data.table;
      limit = data.limit || 100;
      filter = data.filter || {};
      r.table(table)
        .orderBy({index: r.desc('createdAt')})
        .filter(filter)
        .limit(limit)
        .changes()
        .run({cursor: true}, handleCursor);

      function handleCursor(err, cursor){
        
        if(cursor){
          cursor.each(function(err, record){
            socket.emit(table + ':changes', record);
          });
        }
        
        socket.on('disconnect', function(){
          if(cursor){
            cursor.close();
          }
        });

        socket.on('changes:end:' + table, function(data){
          if(cursor){
            cursor.close();
          }
        });
      }
    });
  })
}

module.exports = {
  setup: setup
}