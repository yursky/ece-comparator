const Class = require('../models/Class');
const Vote = require('../models/Vote');
const glicko2 = require('glicko2');

/**
 * GET /api/class
 * Get all classes
 */
exports.getClasses = (req, res) => {
  Class.find({}, (err, _class) => {
    if (err) { return res(err); }
    res.json(_class);
  });
};

/**
 * GET /api/class/:code
 * Get class by code param
 */
exports.getClassByCode = (req, res) => {
  Class.find({code: req.params.code.toUpperCase()}, (err, _class) => {
    if (err) { return res(err); }
    res.json(_class);
  });
};

/**
 * POST /api/vote
 * Vote on a winner between two classes
 */
exports.postVote = (req, res) => {
  const winner = req.body.winner;
  const loser = req.body.loser;

  const vote = new Vote();
  vote.winner = winner;
  vote.loser = loser;
  vote.save();

  var settings = {
    // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
    //      be tested to decide which value results in greatest predictive accuracy."
    tau : 0.8,
    // rating : default rating
    rating : 1500,
    //rd : Default rating deviation
    //     small number = good confidence on the rating accuracy
    rd : 200,
    //vol : Default volatility (expected fluctation on the player rating)
    vol : 0.06
  };
  var ranking = new glicko2.Glicko2(settings);

  Class.findOne({code: winner}, (err, winnerInt) => {
    if (err) { return res(err); }
    Class.findOne({code: loser}, (err, loserInt) => {
      if (err) { return res(err); }
      const _winner = ranking.makePlayer(winnerInt.rating, winnerInt.rd, winnerInt.vol);
      const _loser = ranking.makePlayer(loserInt.rating, loserInt.rd, loserInt.vol);
      var matches = [];
      matches.push([_winner, _loser, 1]);
      ranking.updateRatings(matches);
      winnerInt.rating = _winner.getRating();
      winnerInt.rd = _winner.getRd();
      winnerInt.vol = _winner.getVol();
      winnerInt.save();
      loserInt.rating = _loser.getRating();
      loserInt.rd = _loser.getRd();
      loserInt.vol = _loser.getVol();
      loserInt.save();
      req.flash('success', { msg: `Vote recorded for ${winner} > ${loser}.` });
      res.redirect('/');
    });
  });
};
