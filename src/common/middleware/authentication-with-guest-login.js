/**
 * authentication.js
 * @description :: middleware that checks authentication and authorization of user
 */

import passport from "passport"

const authenticationWithGuestLogin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next()
  }
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" })
    }
    req.user = user
    return next()
  })(req, res, next)
}


export default authenticationWithGuestLogin;
