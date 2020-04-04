import { createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import settingsEpics from '@/redux/reducers/settings/epics';
import rootReducer from './rootReducer';


const epics = [
    settingsEpics.appInitEpic,
];

const epicMiddleware = createEpicMiddleware();

const blacklistedActions = [];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: blacklistedActions,
}) : compose;

const middleware =    composeEnhancers(
    applyMiddleware(
        thunk,
        epicMiddleware,
    ),
);
const store = createStore(rootReducer, middleware);

epicMiddleware.run(combineEpics(...epics));

export default store;
