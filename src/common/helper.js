/**
 * helper.js
 * @description :: exports helper methods for project.
 */
import { baseUrl } from "./constants/config-constant";
import { unlinkSync } from 'fs'
import { createCipheriv, createDecipheriv } from "crypto";
import BadRequestException from "./exceptions/bad-request.exception";
import Notifications from "../../models/notification-history";
import commonService from "../../utils/commonService";
import FcmTokens from "../../models/fcm-token";
import sendPush from "../../src/trait/send-push";

const AES_ENC_KEY = Buffer.from(process.env.AES_ENC_KEY, 'hex') // set random encryption key
const AES_IV = Buffer.from(process.env.AES_IV, 'hex') // set random initialisation vector

export const encrypt = (val) => {
    const cipher = createCipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
    let encrypted = cipher.update(val, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

export const decrypt = (encrypted) => {
    const decipher = createDecipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
    const decrypted = decipher.update(encrypted, 'base64', 'utf8')
    return decrypted + decipher.final('utf8')
}

/**
 * randomString : generate random string for given length
 * @param {number} length : length of random string to be generated (default 75)
 * @return {number} : generated random string
 */
export const randomStringGenerator = (givenLength = 75) => {
    const characters =
        givenLength > 10 ?
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" :
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = givenLength;
    let randomStr = "";

    for (let i = 0; i < length; i++) {
        const randomNum = Math.floor(Math.random() * characters.length);
        randomStr += characters[randomNum];
    }
    return randomStr
}

/**
 * randomString : generate random string for given length
 * @param {number} length : length of random string to be generated (default 75)
 * @return {number} : generated random string
 */
export const randomNumberGenerator = (givenLength = 5) => {
    const characters = "123456789";
    const length = givenLength;
    let randomStr = "";

    for (let i = 0; i < length; i++) {
        const randomNum = Math.floor(Math.random() * characters.length);
        randomStr += characters[randomNum];
    }
    return randomStr
}

/**
 * unlink file
 * @param {*} filename
 */
export const unlinkFile = (filename) => {
    try {
        unlinkSync(filename);
    } catch (e) {
        return;
    }
};



/**
 * App logo 
 * @returns 
 */
export const logo = () => {
    return baseUrl('assets/logo.png')
}



/**
 * array chunk
 * @param {array} items
 * @param {size of chunk} size
 * @returns
 */
export const chunk = (items, size) => {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) {
        chunks.push(items.splice(0, size));
    }

    return chunks;
}


export const checkGuestLoginAndGetUserIdAndLatLong = (authUser, latitude, longitude, search) => {
    const userId = authUser ? authUser.id : 0

    if (search == '') {
        // if (!authUser) {
        //     if (!latitude && !longitude) throw new BadRequestException('latitude and longitude are required.')
        // }
        // if (authUser && !latitude && !longitude) {
        //     latitude = authUser.latitude
        //     longitude = authUser.longitude
        // }
    }

    return {
        userId,
        latitude,
        longitude
    };
};


export const manuallyPaginate = (page, perPage) => {
    const offset = (Number(page) - 1) * Number(perPage);
    const limit = Number(perPage);

    return {
        offset,
        limit
    };
};

export const manuallyPaginateInAdmin = (limit, offset) => {

    return {
        offset,
        limit
    };
};




export const sendPushNotification = (userId, type, id, text, status = '', fcmToken) => {

    // type: 1-Plan, 2:chat, 3: feedback
    // id: id of plan, chat, feedback

    const insertData = {
        userId: userId,
        planId: (type == 1 ? id : null),
        type: type,
        text: text,
        status: status
    }
    commonService.createOne(Notifications, insertData)



    if (fcmToken) {

        // Send push notification
        const registrationToken = fcmToken.token
        const dataPayload = {};

        var title = 'Sip Social'
        var body = text

        const notificationPayload = {
            title,
            body,
        };
        sendPush(registrationToken, dataPayload, notificationPayload);
    }


};