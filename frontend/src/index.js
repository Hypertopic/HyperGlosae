import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './Menu';
import Page from './Page';
import Bookshelf from './Bookshelf';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookshelf />} />
        <Route path="/:id" element={<Page />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
