import update from 'immutability-helper';
import createReducer from '@/utils/reducer.util';
import localTypes from './types';
import { clientRoles } from "@/constants/agora";

const initialState = {
    isInitiated:   false,
    clientRole:    undefined,
    currentStream: undefined,
};

const initAgora = (state) => update( state, {
    isInitiated: { $set: true },
} );

const setCurrentStream = (state, { payload }) => update( state, {
    currentStream: { $set: payload },
} );

const setClientRole = (state, { payload }) => update( state, {
    clientRole: { $set: payload },
} );

const resetStream = (state) => update( state, {
    currentStream: { $set: undefined },
} );

// Reducer
export default createReducer(initialState, {
    [localTypes.AGORA_CLIENT_INITIALIZED]: initAgora,
    [localTypes.AGORA_SET_CURRENT_STREAM]: setCurrentStream,
    [localTypes.AGORA_SET_CLIENT_ROLE]:    setClientRole,
    [localTypes.AGORA_EXIT_STREAM]:        resetStream,
});
