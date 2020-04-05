import localTypes from './types';

export default {
    loginUser(user) {
        return {
            type: localTypes.USER_LOGIN,
            payload: user,
        };
    },
    finishAuth() {
        return {
            type: localTypes.USER_AUTH_FINISHED,
        };
    },
    logoutUser() {
        return {
            type: localTypes.USER_LOGOUT,
        };
    },
};
