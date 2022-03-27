import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './components/redux/store';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </PersistGate>
  </Provider>,
  document.getElementById('root')
);

