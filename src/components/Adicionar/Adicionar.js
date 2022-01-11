import { useRef, useState } from "react";
import CamposComplementares from "./components/CamposComplementares";
import EnderecoService from '../../services/EnderecoService';
import ModalOk from "../Modals/ModalOk";

function Adicionar() {

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const [erro, setErro] = useState(true);
    const [textoErro, setTextoErro] = useState('');

    const [carregando, setCarregando] = useState(false);

    const service = new EnderecoService();

    const modalOk = useRef();

    const [tituloModal, setTituloModal] = useState('');
    const [textoModal, setTextoModal] = useState('');
    const [classeBotaoPositivoModal, setClasseBotaoPositivoModal] = useState('');
    const [textoBotaoPositivoModal, setTextoBotaoPositivoModal] = useState('');

    const tratarCep = valor => {

        const cep = valor.replace(/\D/g, '');

        setCep(cep);

        if (cep.length === 8) {
            buscarEndereco(cep);
        }

        setNumero('');
        setComplemento('');
    }

    const tratarNumero = numero => {
        setNumero(numero);
    }

    const tratarComplemento = complemento => {
        setComplemento(complemento);
    }

    const buscarEndereco = cep => {

        setCarregando(true);

        fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        })
            .then(function (response) {
                response.json()
                    .then(function (resultado) {
                        if (resultado.erro) {
                            setErro(true);
                            setTextoErro('CEP não encontrado! Digite novamente.')
                        } else {
                            setErro(false);
                            setLogradouro(resultado.logradouro);
                            setBairro(resultado.bairro);
                            setCidade(resultado.localidade);
                            setUf(resultado.uf);
                        }
                    })
            })
            .catch(function (err) {
                setErro(true);
                setTextoErro(err);
                console.error(`[ERRO]: ${err}`);
            })
            .finally(() => setCarregando(false));
    }

    const adicionarEndereco = (e) => {
        e.preventDefault();

        const cepJaAdicionado = service.procurarEnderecoSalvo(cep);

        if (cepJaAdicionado) {
            exibirModalCepJaAdicionado();
            return;
        }
        
        const endereco = {
            id: new Date().getTime(),
            nome,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf
        };

        service.adicionarEndereco(endereco);
        estadoInicial();
    }

    const exibirModalCepJaAdicionado = () => {
        setTituloModal('CEP já adicionado');
        setTextoModal('O CEP informado já foi adicionado!');
        setClasseBotaoPositivoModal('btn btn-primary');
        setTextoBotaoPositivoModal('Ok');

        exibirModal();
    }

    const estadoInicial = () => {
        setNome('');
        setCep('');
        setLogradouro('');
        setNumero('');
        setComplemento('');
        setBairro('');
        setCidade('');
        setUf('');

        setErro(true);
        setTextoErro('');

        setCarregando(false);
        
        exibirModalSucessoCadastro();
    }

    const exibirModalSucessoCadastro = () => {
        setTituloModal('Confirmação de cadastro');
        setTextoModal('Endereço adicionado com sucesso!');
        setClasseBotaoPositivoModal('btn btn-success');
        setTextoBotaoPositivoModal('Ok');

        exibirModal();
    }

    const exibirModal = () => {

        modalOk.current.exibirModal();
    }

    const esconderModal = () => {
        modalOk.current.esconderModal();
    }

    return (
        <div className="adicionar container">
            <div className="row">
                <div className="mb-3 col-md-12">
                    <h4>Adicionar endereço</h4>
                </div>
                <form onSubmit={adicionarEndereco}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="nome">Nome do endereço</label>
                        <input
                            className="form-control"
                            placeholder="Nome do endereço"
                            id="nome"
                            onChange={ev => setNome(ev.target.value)}
                            value={nome}
                        />
                    </div>

                    <div className="col-md-2">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="cep">CEP - <small>apenas números</small></label>
                            <input
                                className="form-control"
                                placeholder="CEP"
                                maxLength="8"
                                id="cep"
                                onChange={ev => tratarCep(ev.target.value)}
                                value={cep}
                            />
                        </div>
                    </div>

                    {
                        carregando === true ?
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                            :
                            null
                    }

                    {

                        cep.length === 8 && erro === false ?
                            <CamposComplementares
                                logradouro={logradouro}
                                bairro={bairro}
                                cidade={cidade}
                                complemento={complemento}
                                numero={numero}
                                uf={uf}
                                tratarNumero={tratarNumero}
                                tratarComplemento={tratarComplemento}
                                clicarAdicionar={adicionarEndereco}
                            /> :
                            null
                    }

                    {
                        erro === true && cep.length === 8 && carregando === false ?
                            <div className="alert alert-danger">
                                {textoErro}
                            </div> :
                            null
                    }

                    {
                        cep.length === 8 && erro === false ?
                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={nome === '' || nome === null || numero === '' || numero === null}
                            >Adicionar</button>
                        </div>:
                        null
                    }
                </form>
            </div>

            {/* <ModalOk
                ref={modalOk}
                titulo={tituloModal}
                texto={textoModal}
                classesBotaoPositivo={classeBotaoPositivoModal}
                textoBotaoPositivo={textoBotaoPositivoModal}
                funcaoOk={esconderModal}
            /> */}
        </div>
    );
}

export default Adicionar;
