/**
 * Created by Andrey on 31.10.2014.
 */
'use strict';
var Chunk = require('../models/chunk');


module.exports = {
  save: function(req, res) {
    var chunk = new Chunk(req.body.chunk);
    chunk.save();
    res.send(200);
  },
  list: function(req, res) {
    Chunk.find().exec(function(err, data) {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }
};
