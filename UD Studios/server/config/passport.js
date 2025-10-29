const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // First try to find by provider and providerId
        let user = await User.findOne({
          provider: 'google',
          providerId: profile.id
        });

        // If not found, check if user exists with same email from another provider
        if (!user) {
          user = await User.findOne({
            email: profile.emails[0].value
          });
        }

        // Create new user only if doesn't exist
        if (!user) {
          user = await User.create({
            provider: 'google',
            providerId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0]?.value
          });
        } else if (user.provider !== 'google') {
          // Update provider info if user logged in with different provider before
          user.provider = 'google';
          user.providerId = profile.id;
          user.avatar = user.avatar || profile.photos[0]?.value;
          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error('Google OAuth Error:', error);
        done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'facebook',
          providerId: profile.id
        });

        if (!user && profile.emails?.[0]?.value) {
          user = await User.findOne({
            email: profile.emails[0].value
          });
        }

        if (!user) {
          user = await User.create({
            provider: 'facebook',
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value
          });
        } else if (user.provider !== 'facebook') {
          user.provider = 'facebook';
          user.providerId = profile.id;
          user.avatar = user.avatar || profile.photos?.[0]?.value;
          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error('Facebook OAuth Error:', error);
        done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'github',
          providerId: profile.id
        });

        if (!user && profile.emails?.[0]?.value) {
          user = await User.findOne({
            email: profile.emails[0].value
          });
        }

        if (!user) {
          user = await User.create({
            provider: 'github',
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
            name: profile.displayName || profile.username,
            avatar: profile.photos?.[0]?.value
          });
        } else if (user.provider !== 'github') {
          user.provider = 'github';
          user.providerId = profile.id;
          user.avatar = user.avatar || profile.photos?.[0]?.value;
          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error('GitHub OAuth Error:', error);
        done(error, null);
      }
    }
  )
);

module.exports = passport;
