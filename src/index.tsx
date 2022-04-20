import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {RestfulProvider} from 'restful-react';

import {store} from '@redux/store';

import {GlobalStyle} from '@styles/global';

import App from './App';
import './antd-theme/antd-customized.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <RestfulProvider base={process.env.REACT_APP_API_ENDPOINT || ''}>
          <App />
        </RestfulProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
