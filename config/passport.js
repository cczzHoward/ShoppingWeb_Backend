const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models').users;

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.TOKEN_SECRET;

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            let foundUser = await userModel.findOne({ _id: jwt_payload._id, email: jwt_payload.email, role: jwt_payload.role });
            if (foundUser) {
                return done(null, foundUser); // req.user = foundUser
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log("Error finding user:", error);
            return done(null, false);
        }
    }));
};