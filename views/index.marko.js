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
            out.w('<div class="chart-wrapper" ng-controller="TemperatureCtrl"><div class="chart-title">Temperature {{lastValue | number:1}}\u00b0 F</div><div class="chart-stage"><epoch-live-line class="chart1" chart-height="240" chart-data="line" chart-stream="feed" chart-axes="axes" chart-queue-size="1"></epoch-live-line></div><div class="chart-notes">Measures temperature from Tessel.</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "humidity",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper" ng-controller="HumidityCtrl"><div class="chart-title">Humidity {{lastValue | number:1}}</div><div class="chart-stage"><epoch-live-area class="chart2" chart-height="240" chart-data="line" chart-stream="feed" chart-axes="axes" chart-queue-size="1"></epoch-live-area></div><div class="chart-notes">Measures humidity from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "light",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper" ng-controller="LightCtrl"><div class="chart-title">Light {{lastValue | number:1}} </div><div class="chart-stage"><epoch-gauge gauge-value="feed" gauge-stream="feed" class="gauge-large"></epoch-gauge></div><div class="chart-notes">Measures light from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "sound",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper" ng-controller="SoundCtrl"><div class="chart-title">Sound {{lastValue | number:1}}</div><div class="chart-stage"><epoch-live-bar class="chart4" chart-height="240" chart-data="line" chart-stream="feed" chart-axes="axes" chart-queue-size="1"></epoch-live-bar></div><div class="chart-notes">Measures sound from Tessel</div></div>');
          });
        _tag(out,
          marko_node_modules_marko_layout_put_tag,
          {
            "into": "alerts",
            "layout": _layout
          },
          function(out) {
            out.w('<div class="chart-wrapper" ng-controller="AlertCtrl"><div class="chart-title">Alerts</div><div class="chart-stage"><div class="row"><form ng-submit="add(alert)"><div class="col-xs-12"><h4>Add Alert Rule</h4></div><div class="col-xs-6 form-group"><input ng-model="alert.phone" type="text" class="form-control" placeholder="Phone"></div><div class="col-xs-6 form-group"><select ng-model="alert.table" class="form-control"><option value="temperature">Temperature</option><option value="humidity">Humidity</option><option value="light">Light</option><option value="sound">Sound</option></select></div><div class="col-xs-6 form-group"><input ng-model="alert.min" type="text" class="form-control" placeholder="Min"></div><div class="col-xs-6 form-group"><input ng-model="alert.max" type="text" class="form-control" placeholder="Max"></div><div class="col-xs-12 form-group"><button type="submit" class="btn btn-default">Add</button></div></form></div></div><table class="table table-striped"><thead><tr><th>Phone</th><th>Measure</th><th>Min</th><th>Max</th><th></th></tr></thead><tbody><tr><td>209-555-555</td><td>temperature</td><td>40</td><td>80</td><td><button type="button" class="close"><span>\u00d7</span></button></td></tr><tr ng-repeat="rule in alertRules"><td>{{rule.phone}}</td><td>{{rule.table}}</td><td>{{rule.min}}</td><td>{{rule.max}}</td><td><button type="button" class="close" ng-click="delete(rule)"><span>\u00d7</span></button></td></tr></tbody></table><div class="chart-notes">Setup Alerts</div></div>');
          });
      });
  };
}