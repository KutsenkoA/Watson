/**
 * Created by Andrey on 31.10.2014.
 */
'use strict';

var mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

var chunk = new Schema({
  name: {
    type: 'String',
    require: true
  },
  typeValue: {
    type: 'Number',
    require: true
  },
  parse: {
    type: 'String',
    require: true,
    default: 'unit8'
  }
});

module.exports = mongoose.model('chunk', chunk);