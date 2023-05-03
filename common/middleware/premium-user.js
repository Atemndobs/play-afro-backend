/**
 * premium-user.js
 * @description :: middleware that checks premium user services
 */

import User from "../../models/user";
import commonService from "../../utils/commonService";

const checkPremiumUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await commonService.findByPk(User, userId);
  if (user) {
    if (!user.isPremium) {
      return res.status(400).send({
        message:
          "You are not able to do this operation. Please purchase a premium membership for this.",
      });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }

  return next();
};

export default checkPremiumUser;
