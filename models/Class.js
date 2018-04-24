const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  rating: Number,
  rd: Number,
  vol: Number

}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
