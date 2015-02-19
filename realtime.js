'use strict';
let r = require('./util/dash');

function listen(io){
  io.on('connection', function(socket){
    // TODO: add record

    // TODO: update record

    // TODO: delete record
    
    
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
  listen: listen
}