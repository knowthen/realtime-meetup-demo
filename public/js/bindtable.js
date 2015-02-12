(function(){
'use strict';

var app = angular.module('realtime');

function deleteLocalRow(set, id){
  _.remove(set.rows, function(row){
    return row.id === id;
  });
}

function upsertLocalRow(set, record){
  var idx = _.findIndex(set.rows, function(row){
    return row.id === record.id;
  });
  if(idx > -1){
    set.rows[idx] = record;
  }
  else{
    set.rows.push(record);
  }
}

function updateLocalRows(set, change){
  if(change.new_val === null){
    deleteLocalRow(set, change.old_val.id);
  }
  else{
    upsertLocalRow(set, change.new_val);
  }
}

function addRecord(set, $q, socket){
  return function(record){
    var deffered = $q.defer();
    var data = {table: set.name, record: record};
    socket.emit('add', data, function(err, record){
      if(err){
        deffered.reject(err);
      }
      else{
        console.log(record);
        upsertLocalRow(set, record);
        deffered.resolve(record);
      }
    });
    return deffered.promise;
  }
}

function deleteRecord(set, $q, socket){
  return function(record){
    var deffered = $q.defer();
    var data = {table: set.name, id: record.id};
    socket.emit('delete', data, function(err, result){
      if(err){
        deffered.reject(err);
      }
      else{
        deleteLocalRow(set, record.id);
        deffered.resolve(result);
      }
    });
    return deffered.promise;
  }
}

function updateRecord(set, $q, socket){
  return function(record){
    var deffered = $q.defer();
    var data = {table: set.name, id: record.id, record: record};
    socket.emit('update', data, function(err, result){
      if(err){
        deffered.reject(err);
      }
      else{
        upsertLocalRow(set, record);
        deffered.resolve(result);
      }
    });
    return deffered.promise;
  }
}

app.factory('BindTable', function($q, socket){
  var sets = {};
  function createSet(name, limit, filter){
    limit = limit || 100;
    filter = filter || {};
    var set = {};
    sets[name] = set;
    set.name = name;
    set.rows = [];

    set.delete = deleteRecord(set, $q, socket);
    set.add = addRecord(set, $q, socket);
    set.update = updateRecord(set, $q, socket);

    set.unbind = function(){
      socket.emit('changes:end:' + name);
      socket.removeListener(name + ':changes', changeHandler);
      if(name in sets){
        delete sets[name];
      }
    }
    socket.emit('changes:start', {table: name, limit: limit, filter: filter});
    socket.on(name + ':changes', changeHandler);

    function changeHandler(change){
      updateLocalRows(set, change)
    }
    return set;
  }
  function findOrCreateSet(name, limit, filter){
    if(name in sets){
      return sets[name];
    }
    else {
      return createSet(name, limit, filter);
    }
  }
  return findOrCreateSet
})

})();