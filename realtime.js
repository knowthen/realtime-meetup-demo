'use strict';
let r = require('./util/dash');

function listen(io){
  io.on('connection', function(socket){
    // TODO: add record
    socket.on('add', function(data, cb){
      let table, record;
      table = data.table;
      record = data.record;
      record.createdAt = r.now().toEpochTime();
      r.table(table)
        .insert(record)
        .run(function(err, result){
          record.id = result.generated_keys[0];
          cb(null, record);
        })
    });

    // TODO: update record
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
    
    // TODO: delete record
    socket.on('delete', function(data, cb){
      let table, id;
      table = data.table;
      id = data.id;
      r.table(table)
        .get(id)
        .delete()
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
        .run({cursor: true}, handleChange);

      function handleChange(err, cursor){
        if(err){
          console.log(err);
        }
        else{
          if(cursor){
            cursor.each(function(err, record){
              socket.emit(table + ':changes', record);
            });
          }
        }
        
        socket.on('disconnect', stopCursor);
        socket.on('changes:end:' + table, stopCursor);

        function stopCursor () {
          if(cursor){
            cursor.close();
          }
          socket.removeListener('disconnect', stopCursor);
          socket.removeListener('changes:end:' + table, stopCursor);
        }
      }
    });
  })
}

module.exports = {
  listen: listen
}