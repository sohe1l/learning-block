const express = require('express');
const request = require('request');
const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../model/user.js');
const { validateCreateUser } = require('../validators/user.js');


const authRouter = express.Router();

authRouter.route('/login')
  .get((req, res) => {
    res.render('auth/login', { user: req.user});
  });


authRouter.route('/login/failed')
  .get((req, res) => {
    res.render('auth/login', { loginError: true,  user: req.user });
  });

authRouter.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

authRouter.route('/register')
  .get((req, res) => {
    res.render('auth/register', {user: req.user});
  })
  .post(validateCreateUser(), (req, res) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    // fix error
    if (errors.length !== 0) {
      res.render('auth/register', {
        isLoggedIn: req.isAuthenticated(),
        errors,
        body: req.body,
        user: req.user
      });
      return;
    }
   
    User.register(req.body.name, req.body.email, req.body.password)
    .then((userID) => {
      req.login({ id: userID }, () => res.redirect('/'));
    });

  });

authRouter.route('/login')
  .get((req, res) => {
    res.render('register', { isLoggedIn: req.isAuthenticated(),  user: req.user });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/dashboard/',
    failureRedirect: '/auth/login/failed',
    failureFlash: false,
  }));

module.exports = authRouter;