/**
 * Created by Andrey on 31.10.2014.
 */
'use strict';
var Chunk = require('../models/chunk');


module.exports = {
  save: function(req, res) {

    var chunk;

    if (req.body.chunk._id) {
      Chunk.findByIdAndUpdate(req.body.chunk._id,
        {$set: {
          name: req.body.chunk.name,
          typeValue: req.body.chunk.typeValue,
          parse: req.body.chunk.parse
        }}, function (err, chunk) {
          if (err) {
            console.log(err);
            res.send(401);
          } else {
            res.send(200);
          }
        });
    } else {
      chunk = Chunk(req.body.chunk);
      chunk.save();
    }

    res.send(200);
  },

  remove: function(req, res) {
    Chunk.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        console.log(err);
        res.send(401);
      } else {
        res.send(200);
      }
    })
  },

  list: function(req, res) {
    Chunk.find().sort({name: 1}).exec(function(err, data) {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }
};
