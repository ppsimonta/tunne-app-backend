const passport = require('passport');
const Profiles = require('../models/user');
import { getAllProfiles } from "../services/authService";
import dotenv from 'dotenv';


// Initiates the google oauth 2.0 authentication flow
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback URL for handling the OAuth 2.0 response
exports.googleAuthCallback = passport.authenticate('google', { failureRedirect: '/auth/failed', successRedirect: process.env.corsOrigin, });

// Success login route
exports.successLogin = (req: any, res: any) => {
  const user = req.user;
  res.send('You have successfully logged in ' + user);
  console.log(user)
};

// Failed login route
exports.failedLogin = (req: any, res: any) => {
  res.send('You failed to log in');
};

// Logout route
exports.logout = (req: any, res: any, next: Function) => {
  req.logout(function(err: any) {
    if (err) { return next(err); }
    req.session.destroy(function(err: any) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};

// Get all profiles route
exports.getAllProfiles = async (req: any, res: any) => {
    try {
      await getAllProfiles(req, res);
    } catch (error) {
      console.error('Error in getAllProfiles controller', error);
      res.status(500).send('Internal server error');
    }
  };

// Get logged in user id route
exports.getLoggedInUser = (req: any, res: any) => {
  try {
    const user = req.session.passport
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error('Error in getLoggedInUserId controller', error);
    res.status(500).send('Internal server error');
  }
};





