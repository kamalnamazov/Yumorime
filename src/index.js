import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalContextProvider } from './context/global';
import GlobalStyle from './Globalstyle';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <GlobalStyle>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    </GlobalStyle>
  </HashRouter>
);