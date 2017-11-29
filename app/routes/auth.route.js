const express = require('express');
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();
const authCtrl = new AuthController();

authRouter.post('/signup', authCtrl.signup.bind(authCtrl));
authRouter.post('/login', authCtrl.login.bind(authCtrl));

module.exports = authRouter;
