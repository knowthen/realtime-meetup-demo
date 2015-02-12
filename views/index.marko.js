module.exports = function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __layout_marko = __helpers.l(require.resolve("./layout.marko")),
      marko_node_modules_marko_layout_use_tag = require("marko/node_modules/marko-layout/use-tag"),
      _tag = __helpers.t,
      marko_node_modules_marko_layout_put_tag = require("marko/node_modules/marko-layout/put-tag");

  return function render(data, out) {
    _tag(out,
      marko_node_modules_marko_layout_use_tag,
      {
        "template": __layout_marko
      },
      function(_layout) {
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "temperature",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper"><div class="chart-title">Temperature</div><div class="chart-stage" ng-controller="TemperatureCtrl"><epoch-live-area class="chart1" chart-height="200" chart-data="line" chart-stream="feed" chart-axes="axes"></epoch-live-area></div><div class="chart-notes">Measures temperature from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "humidity",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper"><div class="chart-title">Humidity</div><div class="chart-stage" ng-controller="HumidityCtrl"><epoch-live-area class="chart2" chart-height="200" chart-data="line" chart-stream="feed" chart-axes="axes"></epoch-live-area></div><div class="chart-notes">Measures humidity from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "light",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper"><div class="chart-title">Light</div><div class="chart-stage" ng-controller="LightCtrl"><epoch-live-area class="chart3" chart-height="200" chart-data="line" chart-stream="feed" chart-axes="axes"></epoch-live-area></div><div class="chart-notes">Measures light from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "sound",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper"><div class="chart-title">Sound</div><div class="chart-stage" ng-controller="SoundCtrl"><epoch-live-area class="chart4" chart-height="200" chart-data="line" chart-stream="feed" chart-axes="axes"></epoch-live-area></div><div class="chart-notes">Measures sound from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "alerts",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper" ng-controller="AlertCtrl"><div class="chart-title">Alerts</div><div class="chart-stage"><table class="table table-striped"><thead><tr><th>Phone</th><th></th><th>Min</th><th>Max</th><th></th></tr></thead><tbody><tr ng-repeat="alert in alerts"><td>{{alert.phone}}</td><td>{{alert.measure}}</td><td>{{alert.min}}</td><td>{{alert.max}}</td><td><button type="button" class="close" ng-click="delete(alert)"><span>\u00d7</span></button></td></tr></tbody></table><div class="row"><form ng-submit="add(alert)"><div class="col-xs-12"><h4>Add Alert</h4></div><div class="col-xs-6 form-group"><input ng-model="alert.phone" type="text" class="form-control" placeholder="Phone"></div><div class="col-xs-6 form-group"><select ng-model="alert.measure" class="form-control"><option value="temp">Temp</option><option value="humid">Humid</option><option value="light">Light</option><option value="sound">Sound</option></select></div><div class="col-xs-6 form-group"><input ng-model="alert.min" type="text" class="form-control" placeholder="Min"></div><div class="col-xs-6 form-group"><input ng-model="alert.max" type="text" class="form-control" placeholder="Max"></div><div class="col-xs-12 form-group"><button type="submit" class="btn btn-default">Add</button></div></form></div></div><div class="chart-notes">Setup Alerts</div></div>');
          });
      });
  };
}