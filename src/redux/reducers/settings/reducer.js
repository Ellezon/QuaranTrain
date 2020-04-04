import createReducer from '@/utils/reducer.util';
import localTypes from './types';

const initialState = {
    isLoaded: false,
};

const initApp = (state, { payload }) => ({
    ...initialState,
    isLoaded: true,
});

// Reducer
export default createReducer(initialState, {
    [localTypes.APP_INITIALIZED]: initApp,
});
