import React from 'react';
import './styles/index.css';
import Menu from './components/Menu';
import Lectern from './routes/Lectern';
import Bookshelf from './routes/Bookshelf';
import Hyperglosae from './hyperglosae';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { TypesContext } from './components/TypesContext.js';
import LecternBlank from './routes/LecternBlank';
import Registration from './routes/Registration';

const backend = new Hyperglosae(
  x => NotificationManager.warning(x, '', 2000)
);

function App() {
  const [types, setTypes] = React.useState([]);
  const [user, setUser] = React.useState();
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
        <Menu {...{backend, user, setUser}} />
        <NotificationContainer />
        <TypesContext.Provider value={types}>
          <Routes>
            <Route path="/" element={<Bookshelf {...{backend, user}} />} />
            <Route path="/blank" element={<LecternBlank {...{backend}}/>} />
            <Route path="/registration" element={<Registration {...{backend}}/>} />
            <Route path="/:id" element={<Lectern {...{backend, user}} />} />
          </Routes>
        </TypesContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

