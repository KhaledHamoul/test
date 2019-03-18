
var User = require('../models/User')
var Match = require('../models/Match')
var sequelize = require('../config/db')
var path = require('path');
var fs = require('fs')

exports.index = (req, res) => {
    User.findAll().then(users => {
        res.render('index', { users: users, login: req.session.login ? true : false });
    })
}

exports.account = (req, res) => {
    if (req.session.login) {
        res.render('account', { userId : req.session.user.id })
    }
    res.redirect('/')
}

exports.preferences = (req, res) => {
    res.render('preferences', { user: req.session.user })
}

exports.matches = (req , res ) => {
    sequelize.query(`SELECT * from matches inner join users on users.id = matches.propose WHERE matches.user = ${req.session.user.id} 
    and matches.propose in ( SELECT user from matches WHERE matches.propose = ${req.session.user.id} )   `).then((results) => {
        res.render('matches', { matches: results })
      })
    
}

exports.updateUser = (req, res) => {
    var params = req.body;

    User.update({
        nom: params.nom,
        prenom: params.prenom,
        description: params.description,
        sexe: params.sexe,
        age: params.age,
        pays: params.pays,
        email: params.email,
        password: params.pwd,
        avatar: req.files.avatar ? "/storage/avatars/" + req.files.avatar.name : params.avatar_name,
        prefered: "{}"
    },
        {
            where: {
                id: req.session.user.id
            }
        }
    ).then((user) => {
        User.findAndCountAll({
            where: {
                id: req.session.user.id
            }
        })
            .then(result => {
                if (result.count == 1) {
                    req.session.user = result.rows[0]

                    if (req.files.avatar)
                        req.files.avatar.mv(path.join(__dirname, '../public/storage/avatars/' + req.files.avatar.name), (err) => {
                            if (err)
                                return res.status(500).send(err);

                            res.redirect('/mon-compte')
                        })
                    else res.redirect('/mon-compte')
                }
                else res.redirect('/');
            });


    })


}