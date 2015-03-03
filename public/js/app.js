(function(){
'use strict';

var app = angular.module('realtime', ['ng.epoch', 'btford.socket-io']);

app.factory('socket', function(socketFactory){
  return socketFactory();
});
// TODO: add alert controller


app.controller('TemperatureCtrl', function($scope, socket){
  var message;
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{values: [{time: (new Date()).getTime() / 1000, y: 80}]}];
  message = {table: 'temperature', limit: 1};
  socket.emit('changes:start', message);
  socket.on('reconnect', function(){
    socket.emit('changes:start', message);
  });
  socket.on('temperature:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.measure
      };
      $scope.feed = [record];
      $scope.lastValue = data.new_val.measure;
    }
  });
});

app.controller('LightCtrl', function($scope, socket){
  var message;
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [0];
  message = {table: 'light', limit: 1};
  socket.emit('changes:start', message);
  socket.on('reconnect', function(){
    socket.emit('changes:start', message);
  });
  socket.on('light:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.measure
      };
      $scope.feed = data.new_val.measure / 100.0;
      $scope.lastValue = data.new_val.measure;
    }
  })
});

app.controller('HumidityCtrl', function($scope, socket){
  var message;
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{label: 'Humidity', values: [{time: (new Date()).getTime() / 1000, y: 0}]}];
  message = {table: 'humidity', limit: 1};
  socket.emit('changes:start', message);
  socket.on('reconnect', function(){
    socket.emit('changes:start', message);
  });
  socket.on('humidity:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.measure
      };
      $scope.feed = [record];
      $scope.lastValue = data.new_val.measure;
    }
  })
});

app.controller('SoundCtrl', function($scope, socket){
  var message;
  $scope.axes = ['left', 'right', 'bottom'];
  $scope.line = [{values: [{time: (new Date()).getTime() / 1000, y: 0}]}];
  message = {table: 'sound', limit: 1};
  socket.emit('changes:start', message);
  socket.on('reconnect', function(){
    socket.emit('changes:start', message);
  });
  socket.on('sound:changes', function(data){
    var record;
    if(data.new_val){
      record = {
        time: data.new_val.createdAt,
        y: data.new_val.measure
      };
      $scope.feed = [record];
      $scope.lastValue = data.new_val.measure;
    }
  })
});

})();