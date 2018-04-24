const fs = require('fs');
const classes = JSON.parse(fs.readFileSync('config/classes.json', 'utf8'));
const Class = require('../models/Class');

// Populates the db if there are no classes present
Class.findOne({}).exec((err, _class) => {
  if (!_class){
    for (const _class in classes) {
        if (classes.hasOwnProperty(_class)) {
          const newClass = new Class();
          newClass.code = _class;
          newClass.name = classes[_class].name;
          newClass.description = classes[_class].description;
          newClass.rating = classes[_class].rating;
          newClass.rd = classes[_class].rd;
          newClass.vol = classes[_class].vol;
          newClass.save();
        }
    }
  }
});
