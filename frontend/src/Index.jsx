import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/common/index.css'
import { routerInfo } from "./router/router.jsx"

const router = createBrowserRouter(routerInfo)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>
  
);

