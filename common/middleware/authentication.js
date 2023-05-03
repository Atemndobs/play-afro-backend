/**
 * authentication.js
 * @description :: middleware that checks authentication and authorization of user
 */

import passport from "passport";
import { ROLE } from "../constants/constant";

const authentication = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user && user.role !== ROLE.USER) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default authentication;
