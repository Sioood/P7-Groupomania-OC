const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/user/:id', userCtrl.user)
router.get('/user', userCtrl.users)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;