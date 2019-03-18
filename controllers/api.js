var User = require('../models/User')
var Match = require('../models/Match')
var sequelize = require('../config/db')


exports.nextUser = (req, res) => {

  sequelize.query(`SELECT * from users WHERE id != ${req.params.id} and id not in ( SELECT propose FROM matches WHERE user = ${req.params.id} ) `).then((results) => {
    res.json(results)
  })


}

exports.match = (req, res) => {
  Match.create({
    user: req.params.user,
    propose: req.params.match,
    reaction: req.params.reaction
  }).then(() => {
    res.end()
  })

}