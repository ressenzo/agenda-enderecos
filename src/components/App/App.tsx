import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Adicionar from '../../pages/Adicionar/Adicionar';
import Alterar from '../../pages/Alterar/Alterar';
import Favoritos from '../../pages/Favoritos/Favoritos';
import Menu from '../Menu/Menu';
import Salvos from '../../pages/Salvos/Salvos';
import Login from '../../pages/Login/Login';
import Registrar from '../../pages/Registrar/Registrar';
import { useState } from 'react';

function App() {

  // TODO Alterar para obter variável dinamicamente
  const [exibirMenu, setExibirMenu] = useState<boolean>(false);

  return (
    <Router>
      { exibirMenu ?? <Menu  /> }
      <Routes>
        <Route path='/' element={<Adicionar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/salvos' element={<Salvos />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/alterar/:id' element={<Alterar />} />
      </Routes>
    </Router>
  );
}

export default App;
