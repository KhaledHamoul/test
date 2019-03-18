var User = require('../models/User')
var path = require('path');
var fs = require('fs')


// Inscription
exports.signup = (req, res) => {
    res.render('signup')
};

exports.newUser = (req, res) => {
    var params = req.body;
    User.create({
        nom: params.nom,
        prenom: params.prenom,
        description: params.description,
        sexe: params.sexe,
        age: params.age,
        pays: params.pays,
        email: params.email,
        password: params.pwd,
        avatar: "/storage/avatars/"+ req.files.avatar.name,
        prefered: "{}"
    })
    req.files.avatar.mv( path.join(__dirname , '../public/storage/avatars/'+ req.files.avatar.name ), (err) => {
        if (err)
            return res.status(500).send(err);

        res.redirect('/')
    })
};

// Connexion
exports.login = (req, res) => {
    res.render('login')
};

exports.checkLogin = ( req , res ) => {
    User.findAndCountAll({
        where: {
            email: req.body.email,
            password: req.body.pwd
        }
     })
     .then(result => {
       if(result.count == 1) {
            req.session.login = true
            req.session.user = result.rows[0]
            res.redirect('/')
       }
       res.redirect('back');
     });
}

// deconnection
exports.logout = (req, res) => {
    req.session.login = false;
    res.redirect('/')
};