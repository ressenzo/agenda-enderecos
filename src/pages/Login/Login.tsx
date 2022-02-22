import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';
import UsuarioService from '../../services/UsuarioService';

function Login() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [entrando, setEntrando] = useState<boolean>(false);

    const entrar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEntrando(true);
        const service = new UsuarioService();
        service.logar(email, senha);
        setEntrando(false);
    }

    return (
        <main className="login-form-signin">
            <FormularioLogin
                tituloFormulario="Entrar"
                submitForm={entrar}
                exibirLoading={entrando}
                textoBotao="Entrar"
                onChangeEmail={setEmail}
                onChangeSenha={setSenha}
            />
            <div>
                <p>Não é cadastrado? <Link to="/registrar">Clique aqui</Link></p>
            </div>
        </main>
    );
}

export default Login;
