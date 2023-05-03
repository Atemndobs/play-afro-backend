/**
 * authentication-manager.js
 * @description :: middleware that checks authentication and authorization of manager
 */

import passport from "passport"
import { ROLE } from "../constants/constant"

const authenticationManager = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user && user.role !== ROLE.MANAGER) {
      return res.status(401).send({ message: "Unauthorized" })
    }
    req.user = user
    return next()
  })(req, res, next)
}

export default authenticationManager;
