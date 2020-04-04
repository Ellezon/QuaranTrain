import { ofType } from 'redux-observable';
import { empty } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import localTypes from './types';

const epics = {
    appInitEpic: (action$) => {
        return action$.pipe(
            ofType(localTypes.APP_INITIALIZED),
            tap(() => console.log('HURRAY')),
            mapTo(() => empty),
        );
    },

};

export default epics;
