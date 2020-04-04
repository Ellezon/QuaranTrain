import { combineReducers } from 'redux';
import settings from '@/redux/reducers/settings/reducer';
import agora from '@/redux/reducers/agora/reducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    agora,
    settings,
    form: formReducer,
});
