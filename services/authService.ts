const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import dotenv from 'dotenv';
import Profiles from '../models/user';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    function(accessToken: string, refreshToken: string, profile: string, done: Function) {
        console.log(profile);
        return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

passport.deserializeUser(async (req: any, user: any, done: Function) => {
    try {
        // Tarkista, onko vastaava profiili jo olemassa tietokannassa
        const existingProfile = await Profiles.findOne({
            where: {
                email: user.emails[0].value
            }
        });


        // Jos vastaava profiili on jo olemassa, älä luo uutta profiilia
        if (existingProfile) {
            console.log('Profile exists');
            //tallenna user id sessioniin
            req.session.userId = user.id;
            console.log(req.session.userId);
            done(null, user);
            return;
        }

        // Jos profiilia ei ole vielä olemassa, luo uusi profiili tietokantaan
        const newProfile = await Profiles.create({
            id: user.id,
            first_name: user.name.givenName,
            last_name: user.name.familyName,
            email: user.emails[0].value,
            created_at: new Date(),
            role: 'user'
        });
        

        console.log('New profile created');
        done(null, user);
    } catch (error) {
        console.error('Error creating profile', error);
        done(error);
    }
});

export const getAllProfiles = async (req: any, res: any) => {
    try {
        const profiles = await Profiles.findAll();
        if (!profiles) {
            res.status(404).send('Profiles not found');
            return;
        }
        res.json(profiles);
    } catch (error) {
        console.error('Error fetching profiles', error);
        res.status(500).send('Internal server error');
    }
}
/*
export const getLoggedInUserId = async (req: any, res: any) => {
    try {
        const user = req.session.passport.user;
        res.json(user);
        console.log(user);
    } catch (error) {
        console.error('Error fetching user id', error);
        res.status(500).send('Internal server error');
    }
}
*/




