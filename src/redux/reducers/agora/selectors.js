import { getUserId } from "@/redux/reducers/user/selectors";

export const getAgoraCurrentStream = (state) => state.agora.currentStream;

export const getAgoraIsStreaming = (state) => state.agora.isStreaming;

export const getIsInsideStream = (state) => state.agora.isInsideStream;

export const getStreamID = (state) => state.agora.streamID;

export const getHostID = (state) => state.agora.hostID;

export const getAgoraIsHost = (state) => getHostID(state) === getUserId(state);
