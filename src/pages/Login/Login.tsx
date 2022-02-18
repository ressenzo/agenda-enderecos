import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';

function Login() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [entrando, setEntrando] = useState<boolean>(false);

    const entrar = () => {
        setEntrando(true);
    }

    return (
        <main className="form-signin">
            <FormularioLogin
                tituloFormulario="Entrar"
                aoClicarBotao={entrar}
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
