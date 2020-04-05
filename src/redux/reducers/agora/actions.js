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
    agoraSetIsInsideStream(isInsideStream) {
        return {
            type: localTypes.AGORA_SET_IS_INSIDE_STREAM,
            payload: isInsideStream,
        };
    },
    agoraSetStreamID( streamID ) {
        return {
            type: localTypes.AGORA_SET_STREAM_ID,
            payload: streamID,
        };
    },
    agoraSetHostID( hostID ) {
        return {
            type: localTypes.AGORA_SET_HOST_ID,
            payload: hostID,
        };
    },
};
