import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {RestfulProvider} from 'restful-react';

import 'antd/dist/antd.min.css';

import {GlobalStyle} from '@styles/global';
import {store} from '@redux/store';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <RestfulProvider base="http://127.0.0.1:4010">
          <App />
        </RestfulProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
