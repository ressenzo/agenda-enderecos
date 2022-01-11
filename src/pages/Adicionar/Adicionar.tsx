import { useState } from "react";
import CamposComplementares from "../../components/CamposComplementares/CamposComplementares";
import EnderecoService from '../../services/EnderecoService';
import ModalOk from "../../components/Modals/ModalOk";
import { Endereco } from "../../models/interfaces/EnderecoInterface";

function Adicionar() {

    const [nome, setNome] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [uf, setUf] = useState<string>('');

    const [erro, setErro] = useState<boolean>(true);
    const [textoErro, setTextoErro] = useState<string>('');

    const [carregando, setCarregando] = useState<boolean>(false);

    const [exibirModal, setExibirModal] = useState<boolean>(false);

    const service = new EnderecoService();

    const [tituloModal, setTituloModal] = useState('');
    const [textoModal, setTextoModal] = useState('');
    const [classeBotaoPositivoModal, setClasseBotaoPositivoModal] = useState('');
    const [textoBotaoPositivoModal, setTextoBotaoPositivoModal] = useState('');

    const tratarCep = (valor: string) => {

        const cep = valor.replace(/\D/g, '');

        setCep(cep);

        if (cep.length === 8) {
            buscarEndereco(cep);
        }

        setNumero('');
        setComplemento('');
    }

    const tratarNumero = (numero: string) => {
        setNumero(numero);
    }

    const tratarComplemento = (complemento: string) => {
        setComplemento(complemento);
    }

    const buscarEndereco = (cep: string) => {

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

    const adicionarEndereco = (e: any) => {
        e.preventDefault();

        const cepJaAdicionado = service.procurarEnderecoSalvo(cep);

        if (cepJaAdicionado) {
            exibirModalCepJaAdicionado();
            return;
        }
        
        const endereco: Endereco = {
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

        setExibirModal(true);
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

        setExibirModal(true);
    }

    const esconderModal = () => {
        setExibirModal(false);
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
                                maxLength={8}
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

            <ModalOk
                titulo={tituloModal}
                texto={textoModal}
                classesBotaoPositivo={classeBotaoPositivoModal}
                textoBotaoPositivo={textoBotaoPositivoModal}
                exibir={exibirModal}
                funcaoBotaoPositivo={esconderModal}
            />
        </div>
    );
}

export default Adicionar;
