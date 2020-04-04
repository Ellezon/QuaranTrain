import update from 'immutability-helper';
import createReducer from '@/utils/reducer.util';
import localTypes from './types';

const initialState = {
    isInitiated: false,
    streamList:  [],
};

const initAgora = (state) => update( state, {
    isInitiated: { $set: true },
} );

const addMainStream = (state, { payload }) => update( state, {
    streamList: { $push: [payload] },
} );

const addNormalStream = (state, { payload }) => update( state, {
    streamList: { $unshift: [payload] },
} );

// Reducer
export default createReducer(initialState, {
    [localTypes.AGORA_CLIENT_INITIALIZED]: initAgora,
    [localTypes.AGORA_ADD_MAIN_STREAM]:    addMainStream,
    [localTypes.AGORA_ADD_LOCAL_STREAM]:   addNormalStream,
});
