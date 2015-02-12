'use strict';
let rethinkdbdash = require('rethinkdbdash');

let r;

r = rethinkdbdash({db: 'test'});

module.exports = r;