import 'core-js/es';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import { store } from './state/index';
import { App } from './App';
import 'antd/dist/antd.less';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
