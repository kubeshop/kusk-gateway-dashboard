import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {KUSK_SETTINGS_TARGET_API} from '@constants/constants';

import {useAppDispatch} from '@redux/hooks';
import {setApiEndpoint} from '@redux/reducers/main';
import {store} from '@redux/store';

import {GlobalStyle} from '@styles/global';

import App from './App';
import './antd-theme/antd-customized.css';

const RestfulProviderApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loadingBaseUrl, setLoadingBaseUrl] = useState<boolean>(true);
  useEffect(() => {
    const localStorageApiEndpoint = localStorage.getItem(KUSK_SETTINGS_TARGET_API);
    setLoadingBaseUrl(false);
    if (!localStorageApiEndpoint) {
      return;
    }

    dispatch(setApiEndpoint(localStorageApiEndpoint));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingBaseUrl) {
    return null;
  }

  return <App />;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />

        <RestfulProviderApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
