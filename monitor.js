var request = require('request');

var options = {
  method: 'GET',
  url: 'http://ip.jsontest.com/'
};

request(options, function(err, response, body){
  console.log(body);
})