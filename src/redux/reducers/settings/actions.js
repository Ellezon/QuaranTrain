import localTypes from './types';

export default {
    appInitialized() {
        return {
            type: localTypes.APP_INITIALIZED,
        };
    },
};
