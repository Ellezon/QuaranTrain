import update from 'immutability-helper';
import createReducer from '@/utils/reducer.util';
import localTypes from './types';

const initialState = {
    hasAuthEnded: false,
    isLoggedIn:   false,
    name:         '',
    surname:      '',
    userEmail:    undefined,
    avatar:       '',
};

const setUser = (state, { payload: { name, surname, email, photoUrl } }) => update( state, {
    hasAuthEnded: { $set: true },
    isLoggedIn:   { $set: true },
    name:         { $set: name },
    surname:      { $set: surname },
    userEmail:    { $set: email },
    avatar:       { $set: photoUrl },
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
