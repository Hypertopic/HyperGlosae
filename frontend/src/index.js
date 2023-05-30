import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './Menu';
import Page from './Page';
import Bookshelf from './Bookshelf';
import Hyperglosae from './hyperglosae';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const backend = new Hyperglosae(
  x => NotificationManager.warning(x, '', 2000)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu {...{backend}} />
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<Bookshelf {...{backend}} />} />
        <Route path="/:id" element={<Page {...{backend}} />} />
        <Route path="/collection/:collectionId/document/:id" element={<Page {...{backend}} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
