import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App';
import { Provider } from 'react-redux';
import store from '@/redux/createStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
), document.getElementById('root'));

if (module.hot) { // enables hot module replacement if plugin is installed
  module.hot.accept();
}
