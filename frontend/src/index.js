import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Menu from './components/Menu';
import Lectern from './routes/Lectern';
import Bookshelf from './routes/Bookshelf';
import Hyperglosae from './hyperglosae';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { TypesContext } from './components/TypesContext.js';

const backend = new Hyperglosae(
  x => NotificationManager.warning(x, '', 2000)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [types, setTypes] = React.useState([]);
  const [credentials, setCredentials] = React.useState(null);
  React.useEffect(() => {
    backend.getView({view: 'types', options: ['include_docs']})
      .then(
        (rows) => {
          setTypes(rows);
        }
      );
  }, []);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Menu backend={backend} credentials={credentials} setCredentials={setCredentials} />
        <NotificationContainer />
        <TypesContext.Provider value={types}>
          <Routes>
            <Route path="/" element={<Bookshelf backend={backend} credentials={credentials} />} />
            <Route path="/:id" element={<Lectern {...{backend}} />} />
          </Routes>
        </TypesContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
