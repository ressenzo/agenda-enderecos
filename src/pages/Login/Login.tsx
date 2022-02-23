import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';
import UsuarioService from '../../services/UsuarioService';
import ResultadoLogarInterface from '../../models/interfaces/ResultadoLogarInterface';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { adicionar } from '../../slices/UsuarioSlice';
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [entrando, setEntrando] = useState<boolean>(false);

    const [erro, setErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    let navigate = useNavigate();

    const entrar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEntrando(true);
        const service = new UsuarioService();
        service.logar(email, senha)
        .then((resultado: ResultadoLogarInterface) => {
            const usuario = { email: resultado.email, ehPremium: resultado.ehPremium };
            dispatch(adicionar(usuario));
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
