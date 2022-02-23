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
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Usuario from '../../models/UsuarioModel';

function App() {

  // TODO Alterar para obter variável dinamicamente
  const [exibirMenu, setExibirMenu] = useState<boolean>(false);
  const usuario = useAppSelector(state => state.usuario) as Usuario;

  useEffect(() => {
    if (usuario.email !== '' &&
    usuario.email !== null &&
    usuario.email !== undefined) {
      setExibirMenu(true);
    }
  }, [usuario])

  return (
    <Router>
      { exibirMenu ? <Menu  /> : null }
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
