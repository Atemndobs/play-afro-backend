import { chunk } from "./helper";
import fcmConfig from "./config/firebase";
import FcmTokens from "../model/fcm-token";
import commonService from "../utils/commonService";
import { Op } from "sequelize";

async function getUserTokens(userIds) {
  const query = { userId: { [Op.in]: userIds } }
  const tokens = await commonService.findAllRecords(FcmTokens, query)
  return tokens.map(value => { return value.token })
}


export const sendNotification = async (userIds, payload) => {
  const tokens = await getUserTokens(userIds)
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  // Divide array of tokens to 900 bunch
  let tokenChunks = await chunk(tokens, 999);

  tokenChunks.forEach(function (tokenChunk) {
    fcmConfig
      .messaging()
      .sendToDevice(tokenChunk, payload, notification_options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}


