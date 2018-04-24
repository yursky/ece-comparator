const Class = require('../models/Class');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  Class.find({}, (err, classes) => {
    if (err) { return res(err); }
    const class1 = classes[Math.floor(Math.random()*classes.length)];
    const class2 = classes[Math.floor(Math.random()*classes.length)];
    res.render('home', {
      title: 'Home',
      class1: class1,
      class2: class2,
    });
  });
};

/**
 * GET /rankings
 * Rankings Page
 */
exports.getRankings = (req, res) => {
  Class.find({}, (err, classes) => {
    if (err) { return res(err); }
    function compare(a,b) {
      if (a.rating < b.rating)
        return 1;
      if (a.rating > b.rating)
        return -1;
      return 0;
    }

    classes.sort(compare);
    res.render('rankings', {
      title: 'Rankings',
      classes: classes
    });
  });
};
