const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  winner: String,
  loser: String
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
