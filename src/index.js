import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux';
import { assetsReducer } from './reducers/assetsReducer';
import { SnackbarProvider } from 'notistack';

const reducer = combineReducers({
  assets: assetsReducer,
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>,
  document.getElementById('root')
);

