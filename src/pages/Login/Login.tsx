import { useState } from 'react';
import './Login.css';

function Login() {

    const [entrando, setEntrando] = useState<boolean>(false);

    const entrar = () => {
        setEntrando(true);
    }

    return (
        <main className="form-signin">
            <form>
                <h1 className="h3 mb-3 fw-normal">Entrar</h1>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="nome@exemplo.com"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Senha" />
                </div>
                
                <div className="mb-3">
                    <button
                        className="w-100 btn btn-lg btn-success"
                        type="submit"
                        onClick={entrar}
                        disabled={entrando}
                    >
                        {
                            entrando ?
                            <div className="spinner-border text-light spinner-border-sm" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div> :
                            'Entrar'
                        }
                    </button>
                </div>                
            </form>
            <div>
                <p>Não é cadastrado? <a href="#">Clique aqui</a></p>
            </div>
        </main>
    );
}

export default Login;
