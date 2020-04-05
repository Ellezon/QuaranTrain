import update from 'immutability-helper';
import createReducer from '@/utils/reducer.util';
import localTypes from './types';

const initialState = {
    hasAuthEnded: false,
    isLoggedIn:   false,
    displayName:  '',
    userEmail:    undefined,
    avatar:       '',
    userId:       '',
};

const setUser = (state, { payload: {  displayName, email, photoURL, uid } }) => update( state, {
    hasAuthEnded: { $set: true },
    isLoggedIn:   { $set: true },
    displayName:  { $set: displayName },
    userEmail:    { $set: email },
    avatar:       { $set: photoURL },
    userId:       { $set: uid},
} );


const finishAuth = (state) => update( state, {
    hasAuthEnded: { $set: true },
} );

const logoutUser = (state) => update( state, {
    hasAuthEnded: { $set: false },
    isLoggedIn:   { $set: false },
    name:         { $set: '' },
    surname:      { $set: '' },
    userEmail:    { $set: '' },
} );

// Reducer
export default createReducer(initialState, {
    [localTypes.USER_AUTH_FINISHED]: finishAuth,
    [localTypes.USER_LOGIN]:         setUser,
    [localTypes.USER_LOGOUT]:        logoutUser,
});
