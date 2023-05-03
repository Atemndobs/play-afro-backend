/**
 * constant.js
 * @description :: constants
 */

module.exports = {
    JWT: {
        SECRET: "sipsocialsecretsipsocial",
        EXPIRES_IN: "1 YEAR"
    },

    BCRYPT: {
        SALT_ROUND: 12
    },

    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 25,

    PROVIDER: {
        GOOGLE: 'google',
        FACEBOOK: 'facebook',
        APPLE: 'apple'
    },

    PLAN_FILTER_STATUS: {
        TODAY: '1',
        IN10DAYS: '2',
        LATER: '3'
    },

    PLAN_MEMBER_STATUS: {
        REJECTED: '-1',
        INVITED: '0',
        INTERESTED: '1',
        GOING: '2',
        HOSTED: '3',
        REQUESTED: '4'
    },

    MY_PLAN_FILTER_STATUS: {
        EXPECT: '-1',
        INVITED: '0',
        ALL: '1',
        GOING: '2',
        HOSTED: '3'
    },

    PLACE_FILTER_STATUS: {
        POPULAR: '1',
        FAVOURITES: '2',
        VISITED: '3'
    },

    PLACE_SORT_BY: {
        DISTANCE: '1',
        RATING: '2',
        MOST_REVIEWED: '3'
    },

    PLAN_SORT_BY: {
        DISTANCE: '1',
        PEOPLE: '2',
        DATE: '3'
    },

    MAX_DISTANCE_AROUND_USER_SHOW_DATA: 100, // miles

    NOTIFICATION_TYPE: {
        ALL: '-1',
        PLAN: '1',
        PLACE: '2',
        CHAT: '3',
    },

    NOTIFICATION_TEXT: {
        INVITE_MEMBER_BY_HOST: 'You were invited to a hangout',
        GOING_TO_PLAN_BY_USER: 'User is Going to hangout',
        DECLINE_INVITATION_BY_USER: 'User decline your invitation',
        USER_REQUEST_TO_HOST: 'User has been request to join hangout',
        DECLINE_INTEREST_BY_HOST: 'Host declined your interest',
        ACCEPT_EVENT: 'You have been accepted to the hangout',
    }
};