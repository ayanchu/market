import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import cartReducer, { getTotal } from './store/cartSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

store.dispatch(getTotal())

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
