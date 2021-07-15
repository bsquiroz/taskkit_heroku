require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
const {
    checkUserExist,
    linkUserProvider,
    newUser,
} = require("../services/auth.services");

//estrategia local
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                let user = await Users.findOne({ where: { email } });
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                done(error);
            }
        }
    )
);

//estrategia google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

//estrategia facebook
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: "http://localhost:8000/auth/facebook/callback",
            profileFields: [
                "id",
                "email",
                "gender",
                "link",
                "locale",
                "name",
                "timezone",
                "updated_time",
                "verified",
            ],
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser(async (profile, done) => {
    if (profile.provider) {
        const email = profile.email || profile._json.email;
        const user = await checkUserExist(email);
        const id = profile.id;
        const provider = profile.provider;

        const firstname = profile.given_name || profile._json.first_name;
        const lastname = profile.family_name || profile._json.last_name;

        const userObj = {
            firstname,
            lastname,
            email,
            verified: false,
            password: "123",
        };

        if (user) {
            const userId = user.id;
            await linkUserProvider(id, userId, provider);
            return done(null, user);
        } else {
            const newUserObj = await newUser(userObj);
            const userId = newUserObj.id;
            await linkUserProvider(id, userId, provider);
            return done(null, newUserObj);
        }
    }
    return done(null, profile);
});

passport.deserializeUser(async (profile, done) => {
    try {
        switch (profile.provider) {
            case "google":
                profile.firstname = profile.name.givenName;
                profile.lastname = profile.name.familyName;
                done(null, profile);
                break;

            case "facebook":
                break;

            default:
                let user = await Users.findByPk(profile.id, { plain: true });
                done(null, user);
                break;
        }
    } catch (error) {
        done(error);
    }
});
