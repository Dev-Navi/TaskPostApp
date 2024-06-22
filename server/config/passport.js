const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
import config from "./config";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secrateKey;

import UserModel from "../models/User";

export const UserAuth = (passport) => {
  try {
    passport.use(
      "userAuth",
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          console.log(opts, jwt_payload, "Checkkk");
          let userData = await UserModel.findById(jwt_payload.id);
          if (userData) {
            return done(null, userData);
          }
          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};
