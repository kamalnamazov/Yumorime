import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalContextProvider } from './context/global';
import GlobalStyle from './Globalstyle';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    </GlobalStyle>
  </BrowserRouter>
);