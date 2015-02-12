(function(){
'use strict';

var app = angular.module('realtime', ['ng.epoch', 'btford.socket-io']);

app.factory('socket', function(socketFactory){
  return socketFactory();
});
// add alert controller
app.controller('AlertCtrl', function($scope, BindTable){
  var alertTable = BindTable('alert');
  $scope.alerts = alertTable.rows;
  $scope.delete = alertTable.delete;
  $scope.add = function(record){
    alertTable.add(record)
      .then(function(){
        $scope.alert = {};
      })
  }    
});

app.controller('TemperatureCtrl', function($scope, socket){
  $scope.axes = ['left', 'right','bottom'];
  $scope.line = [{values: [{time: (new Date()).getTime() / 1000, y: 80}]}];
  socket.on('reconnect', function(){
    socket.emit('changes:start', {table: 'temperature', limit: 1});
  });
  socket.emit('changes:start', {table: 'temperature', limit: 1});
  socket.on('temperature:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.temperature
      };
      $scope.feed = [record];
    }
  });
});

app.controller('LightCtrl', function($scope, socket){
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{values: [{time: (new Date()).getTime() / 1000, y: 0}]}];
  socket.on('reconnect', function(){
    socket.emit('changes:start', {table: 'light', limit: 1});
  });
  socket.emit('changes:start', {table: 'light', limit: 1});
  socket.on('light:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.lightLevel
      };
      $scope.feed = [record];
    }
  })

});

app.controller('HumidityCtrl', function($scope, socket){
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{label: 'Humidity', values: [{time: (new Date()).getTime() / 1000, y: 0}]}];
  socket.on('reconnect', function(){
    socket.emit('changes:start', {table: 'humidity', limit: 1});
  });
  socket.emit('changes:start', {table: 'humidity', limit: 1});
  socket.on('humidity:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.humidity
      };
      $scope.feed = [record];
    }
  })

});
// add sound controller
app.controller('SoundCtrl', function($scope, socket){
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{values: [{time: (new Date()).getTime() / 1000, y: 0}]}];
  socket.on('reconnect', function(){
    socket.emit('changes:start', {table: 'sound', limit: 1});
  });
  socket.emit('changes:start', {table: 'sound', limit: 1});
  socket.on('sound:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.soundLevel
      };
      $scope.feed = [record];
    }
  })

});

})();