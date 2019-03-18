var express = require('express');
var router = express.Router();
var auth = require('../controllers/authentification');
var home = require('../controllers/home');
var api = require('../controllers/api');

/*task list*/
//router.get('/task/list', task.list);
/*task mod*/
//router.post('/task/mod/self', task.update);

router.get('/', home.index)
router.get('/signup', auth.signup)
router.post('/signup', auth.newUser)
router.get('/login', auth.login)
router.post('/login', auth.checkLogin)
router.get('/logout', auth.logout)

router.get('/mon-compte', home.account)
router.get('/preferences', home.preferences)
router.get('/matches', home.matches)
router.post('/update-user', home.updateUser)

router.get('/next-user/:id' , api.nextUser)
router.get('/match/:user/:match/:reaction' , api.match)


module.exports = router;