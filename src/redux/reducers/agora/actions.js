import localTypes from './types';

export default {
    agoraClientInitialized() {
        return {
            type: localTypes.AGORA_CLIENT_INITIALIZED,
        };
    },
    agoraSetCurrentStream(stream) {
        return {
            type: localTypes.AGORA_SET_CURRENT_STREAM,
            payload: stream,
        };
    },
    agoraSetClientRole(clientRole) {
        return {
            type: localTypes.AGORA_SET_CLIENT_ROLE,
            payload: clientRole,
        };
    },
    agoraExitStream() {
        return {
            type: localTypes.AGORA_EXIT_STREAM,
        };
    },
};
