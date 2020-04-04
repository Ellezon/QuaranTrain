import localTypes from './types';

export default {
    agoraClientInitialized() {
        return {
            type: localTypes.AGORA_CLIENT_INITIALIZED,
        };
    },
    agoraAddMainStream(stream) {
        return {
            type: localTypes.AGORA_ADD_MAIN_STREAM,
            payload: stream,
        };
    },
    agoraAddNormalStream(stream) {
        return {
            type: localTypes.AGORA_ADD_LOCAL_STREAM,
            payload: stream,
        };
    },
};
