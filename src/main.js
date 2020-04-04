import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/LiveStream/LiveStream.js';
import { Provider } from 'react-redux';
import store from '@/redux/createStore';
import { HashRouter } from "react-router-dom";

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
), document.getElementById('root'));

if (module.hot) { // enables hot module replacement if plugin is installed
  module.hot.accept();
}
