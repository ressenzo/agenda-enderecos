import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss'
import './index.css';
import App from './components/App/App';
import store from './app/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
