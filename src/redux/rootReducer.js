import { combineReducers } from 'redux';
import settings from '@/redux/reducers/settings/reducer';
import agora from '@/redux/reducers/agora/reducer';

export default combineReducers({
    agora,
    settings,
});
