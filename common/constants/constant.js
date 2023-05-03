/**
 * authConstant.js
 * @description :: constants used in authentication
 */

module.exports = {
  JWT: {
    SECRET: "secretdjchartsecretdjchart",
    EXPIRES_IN: "1 YEAR",
  },

  BCRYPT: {
    SALT_ROUND: 12,
  },

  POINTS: {
    REFERRAL: 100,
    EXAMINATION_ANSWER: 5,
    CHECKLIST: 2,
  },

  TRANSACTION_TYPES: {
    REFERRAL_POINTS: 1,
    EXAMINATION_ANSWER: 2,
    CHECKLIST: 3,
  },

  RESET_PASSWORD_LINK: {
    EXPIRES_IN: 60 * 60,
  },

  TASK_STATUS: {
    PENDING: "0",
    IN_PROGRESS: "1",
    COMPLETED: "2",
  },

  APPROVED_STATUS: {
    PENDING: 0,
    ACCEPT: 1,
    REJECTED: 2,
  },

  TASK_CATEGORY: {
    INDOOR: "0",
    OUTDOOR: "1",
  },

  PROGRASS_PERCENTAGE: {
    STAGE_FIVE: 100,
    STAGE_FOUR: 80,
    STAGE_THREE: 60,
    STAGE_TWO: 40,
    STAGE_ONE: 20,
    STAGE_ZERO: 0,
  },

  PROGRESS_MESSAGES: {
    STAGE_ZERO: "Hello, John",
    STAGE_ZERO_DESC: "Today is best to start Journey!",
    STAGE_ONE: "Let’s Go!",
    STAGE_ONE_DESC: "Your Task journey Just started!",
    STAGE_TWO: "Hurry Up!",
    STAGE_TWO_DESC: "You Move ahead to the path!",
    STAGE_THREE: "Half-way there!",
    STAGE_THREE_DESC: "You completed Half of all tasks!",
    STAGE_FOUR: "Getting close!",
    STAGE_FOUR_DESC: "Your goal seems close to complete!",
    STAGE_FIVE: "Congratulations!",
    STAGE_FIVE_DESC: "Your Home’s Health is Good.",
  },

  NOTIFICATION_TYPE: {
    TASK_REMINDER: 1,
    MUSIC: 2,
  },

  MANAGER_NOTIFICATION_TYPE: {
    TASK_REMINDER: 1,
    COMPLETED_INSPECTION: 2,
    USER_REVIEW: 3,
  },

  USER_TYPE: {
    FREE: "free",
    PRIME: "prime",
  },

  ADMIN_MANAGER_FILTER: {
    ALL: "1",
    PENDING: "2",
  },

  ROLE: {
    ARTIST: 0,
    COMPANY: 1,
    DJ: 2,
  },

  SUMMARY_REPORTS: {
    ANSWER_RATING: 3,
  },

  SOCKET_MESSAGE_TYPE: {
    TEXT: 0,
    AUDIO: 1,
    VIDEO: 2,
    PHOTO: 3,
  },

  DEVICE: {
    ANDROID: "Android",
    iOS: "iOS",
  },

  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 25,
};
