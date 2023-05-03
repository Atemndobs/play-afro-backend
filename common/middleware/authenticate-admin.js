// jwt AUTHENTICATION
import jwt from "jsonwebtoken";
import { JWT } from "../constants/constant";

export default (req, res, next) => {
  if (req.session.admintoken) {
    jwt.verify(req.session.admintoken, JWT.SECRET, function (err, decoded) {
      if (err) {
        if (req.xhr) {
          return res.status(401).send("unauthorized");
        }
        res.redirect("/admin");
      } else {
        next();
      }
    });
  } else {
    if (req.xhr) {
      return res.status(401).send("unauthorized");
    }
    return res.redirect("/admin");
  }
};
