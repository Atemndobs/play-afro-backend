/**
 * auth.js
 * @description :: service functions used in authentication
 */

import commonService from "../utils/commonService";
import moment from "moment"
import { JWT, ROLE } from "../common/constants/constant";
import { randomStringGenerator, randomNumberGenerator, encrypt } from "../common/helper";
import jwt from "jsonwebtoken";

import AccessToken from "../models/accessToken";
import User from "../models/users";
import RefreshToken from "../models/refreshToken";
// import sendMail from "../common/email";
import UnauthorizeException from "../common/exceptions/unauthorize.exception";
// import userService from "../users/users.service";
// import UserResource from "../users/resources/user.resource";
import ManagerAccessToken from "../models/accessToken";



class authService {
  /**
   * @description : service to generate JWT token for authentication.
   * @param {obj} user : user who wants to login.
   * @return {string}  : returns access token.
   */
  static async generateAccessToken(user, role) {
    const jti = randomStringGenerator();
    const data = await encrypt(JSON.stringify({ user, jti, role }));
    const accessToken = jwt.sign({ data }, JWT.SECRET, {
      expiresIn: JWT.EXPIRES_IN,
    });
    const decodedToken = jwt.decode(accessToken);
    // store : access token
    if (role === ROLE.USER) {
      commonService.createOne(AccessToken, {
        token: jti,
        userId: user.id || user.userId,
        expiresAt: moment.unix(decodedToken.exp).format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      commonService.createOne(ManagerAccessToken, {
        token: jti,
        managerId: user.id,
        expiresAt: moment.unix(decodedToken.exp).format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    return { accessToken, expiresAt: decodedToken.exp };
  }

  /**
   * @description : service to generate refresh token for authentication.
   * @param {string} accessToken : accessToken for refresh token.
   * @return {string}  : returns refresh token.
   */
  static async generateRefreshToken(accessToken) {
    const refreshToken = randomStringGenerator();
    const decodedToken = jwt.decode(accessToken);
    // store : refresh token
    commonService.createOne(RefreshToken, {
      token: refreshToken,
      accessToken: decodedToken.jti,
      expiresAt: moment
        .unix(decodedToken.exp)
        .add(21, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
    });
    return refreshToken;
  }

  /**
   * @description : Register service
   * @param {Object} data : registered user data
   * @param {file} file
   * @returns nothing
   */
  static async register(data, email) {
    const user = await commonService.findOne(User, { email });
    const verificationOtp = await randomNumberGenerator(5);
    if (user) {
      console.log("already exist");
      // await commonService.updateByQuery(User, { email }, { verificationOtp })
    } else {
      const referralCode = await randomStringGenerator(9).toUpperCase();
      console.log(data);
      await commonService.createOne(User, data);
    }

    const obj = {
      to: email,
      subject: "Welcome to Home Yogi",
      data: { verificationOtp },
    };
    // sendMail(obj, 'OtpVerification')
  }

  /**
   * @description : Register service
   * @param {Object} data : registered user data
   * @param {file} file
   * @returns nothing
   */
  // static async login(reqData, file) {
  //   const { email, otp, referralCode } = reqData
  //   const user = await commonService.findOne(User, { email, verificationOtp: otp })
  //   if (!user) throw new UnauthorizeException('Enter valid OTP')

  //   // insert referal points
  //   if (referralCode) await userService.refferalPointInsertByRefferalCode(referralCode, user)

  //   // update otp verification
  //   await commonService.updateByQuery(User, { email }, { verificationOtp: null })
  //   const authentication = await authService.generateTokenPairs(user, ROLE.USER)
  //   return {
  //     ...new UserResource(user),
  //     authentication
  //   }
  // }

  /**
   * @description : Generate access token & refresh token
   * @param {user} authUser : logged user data
   * @returns access & refresh token
   */
  static async generateTokenPairs(authUser, role) {
    const { accessToken, expiresAt } = await this.generateAccessToken(
      authUser,
      role
    );
    const refreshToken = await this.generateRefreshToken(accessToken);
    return { accessToken, expiresAt, refreshToken };
  }

  /**
   * @description : Generate access token & refresh token threw refresh token
   * @param {string} token : refresh token
   * @returns nothing
   */
  static async refreshToken(token) {
    const refreshToken = await RefreshToken.findOne({
      where: { token: token, isRevoked: false },
      include: [
        {
          model: AccessToken,
          as: "accessTokens",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
      ],
      raw: false,
    });
    if (!refreshToken)
      throw new UnauthorizeException(
        "This refresh token is expired, please login"
      );

    // store old access and refresh token is expired
    await commonService.updateByQuery(
      RefreshToken,
      { token },
      { isRevoked: true }
    );
    const where = { token: refreshToken.accessToken };
    await commonService.updateByQuery(AccessToken, where, { isRevoked: true });

    return this.generateTokenPairs(refreshToken.accessTokens.user.dataValues);
  }

  /**
   * Update user details
   * @param {Object} authUser
   * @param {Object} data
   * @param {files} file
   * @returns
   */
  static async updateUserDetails(authUserId, data, file) {
    if (file)
      data.profileImage = file ? file.destination + "/" + file.filename : null;

    delete data.referralCode;
    const updatedUser = await commonService.updateByPk(User, authUserId, data);
    return updatedUser;
  }
}

export default authService

