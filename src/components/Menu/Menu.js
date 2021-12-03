import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Endereços</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Início
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/salvos">
                                Endereços salvos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favoritos">
                                Favoritos
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
