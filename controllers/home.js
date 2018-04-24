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
      class1: class1.code,
      class2: class2.code,
    });
  });
};
