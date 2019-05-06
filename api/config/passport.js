// import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


import { Customer } from '../models';

const secretKey = 'secretKey';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Customer.findByPk(jwt_payload.customer_id)
      .then((user) => {
        // check if the user has been found

        if (user) {
          return done(null, user);
        }
        // this can be customized to return any unsuccessfull error message like login required
        // by default this returns unauthorized and 401 status code
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};
