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

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path='/' element={<Adicionar />} />
        <Route path='/salvos' element={<Salvos />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/alterar/:id' element={<Alterar />} />
      </Routes>
    </Router>
  );
}

export default App;
