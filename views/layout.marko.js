module.exports = function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      marko_node_modules_marko_layout_placeholder_tag = require("marko/node_modules/marko-layout/placeholder-tag"),
      _tag = __helpers.t;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><meta charset="utf-8"><title>realtime.knowthen.com</title><link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.min.css"><link rel="stylesheet" href="/css/keen-dashboards.css"><link rel="stylesheet" href="/css/epoch.css"></head><body class="application" ng-app="realtime"><div class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="./">realtime.knowthen.com</a></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav navbar-left"><li><a href="http://rethinkdb.com">RethinkDb</a></li><li><a href="http://iojs.org/">io.js</a></li><li><a href="http://socket.io/">Socket.io</a></li><li><a href="http://angularjs.org/">Angularjs</a></li><li><a href="http://tessel.io/">Tessel</a></li></ul></div></div></div><div class="container-fluid"><div class="row"><div class="col-sm-8"><div class="row"><div class="col-sm-6">');
    _tag(out,
      marko_node_modules_marko_layout_placeholder_tag,
      {
        "name": "temperature",
        "content": data.layoutContent
      },
      function() {
        out.w('<p>default content</p>');
      });

    out.w('</div><div class="col-sm-6">');
    _tag(out,
      marko_node_modules_marko_layout_placeholder_tag,
      {
        "name": "humidity",
        "content": data.layoutContent
      },
      function() {
        out.w('<p>default content</p>');
      });

    out.w('</div></div><div class="row"><div class="col-sm-6">');
    _tag(out,
      marko_node_modules_marko_layout_placeholder_tag,
      {
        "name": "light",
        "content": data.layoutContent
      },
      function() {
        out.w('<p>default content</p>');
      });

    out.w('</div><div class="col-sm-6">');
    _tag(out,
      marko_node_modules_marko_layout_placeholder_tag,
      {
        "name": "sound",
        "content": data.layoutContent
      },
      function() {
        out.w('<p>default content</p>');
      });

    out.w('</div></div></div><div class="col-sm-4">');
    _tag(out,
      marko_node_modules_marko_layout_placeholder_tag,
      {
        "name": "alerts",
        "content": data.layoutContent
      },
      function() {
        out.w('<p>default content</p>');
      });

    out.w('</div></div><hr></div><script src="/lib/jquery/dist/jquery.min.js"></script><script src="/lib/bootstrap/dist/js/bootstrap.min.js"></script><script src="/lib/holderjs/holder.js"></script><script>\n    Holder.add_theme(\'white\', { background:\'#fff\', foreground:\'#a7a7a7\', size:10 });\n  </script><script src="/vendor/angular/angular.js"></script><script src="/vendor/d3/d3.js"></script><script src="/vendor/epoch/epoch.min.js"></script><script src="/vendor/ng-epoch/ng-epoch.js"></script><script src="/vendor/angular-socket-io/socket.js"></script><script src="/socket.io/socket.io.js"></script><script src="/vendor/lodash/lodash.min.js"></script><script src="/js/app.js"></script><script src="/js/bindtable.js"></script></body></html>');
  };
}