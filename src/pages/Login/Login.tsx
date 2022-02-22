import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';
import UsuarioService from '../../services/UsuarioService';
import ResultadoLogarInterface from '../../models/interfaces/ResultadoLogarInterface';

function Login() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [entrando, setEntrando] = useState<boolean>(false);

    const [erro, setErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>('');

    const entrar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEntrando(true);
        const service = new UsuarioService();
        service.logar(email, senha)
        .then((resultado: ResultadoLogarInterface) => {
            
        })
        .catch((err: any) => {
            setErro(true);
            setTextoErro('Ocorreu um erro ao fazer login. Tente novamente mais tarde!');
            console.error(`[ERRO]: ${err}`);
        })
        .finally(() => setEntrando(false))        
    }

    const exibirErro = () => {
        return erro === true &&
            textoErro !== '' &&
            textoErro !== null;
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
            {
                exibirErro() ?
                    <div className="alert alert-danger">
                        {textoErro}
                    </div> :
                    null
            }
        </main>
    );
}

export default Login;
