import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EnderecoService from "../../services/EnderecoService";
import { Link, useNavigate } from "react-router-dom";
import CamposComplementares from "../../components/Adicionar/components/CamposComplementares";
import './Alterar.css';
import ModalOk from "../../components/Modals/ModalOk";

function Alterar() {

    let { id } = useParams();
    let navigate = useNavigate();

    const [nome, setNome] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const [idEndereco, setIdEndereco] = useState<number>(0);

    const [exibirModal, setExibirModal] = useState<boolean>(false);

    useEffect(() => {

        if (!id) {
            navigate('/salvos');
            return;
        }

        const idEnd = parseInt(id.toString());
        setIdEndereco(idEnd);
        const service = new EnderecoService();
        const endereco = service.obterEnderecoSalvo(idEnd);
        if (endereco === null || endereco === undefined) {
            navigate('/salvos');
            return;
        }

        setNome(endereco.nome);
        setCep(endereco.cep);
        setLogradouro(endereco.logradouro);
        setNumero(endereco.numero);
        setComplemento(endereco.complemento);
        setBairro(endereco.bairro);
        setCidade(endereco.cidade);
        setUf(endereco.uf);
    }, [id, navigate])

    const tratarNumero = (numero: string) => {
        setNumero(numero);
    }

    const tratarComplemento = (complemento: string) => {
        setComplemento(complemento);
    }

    const alterarEndereco = (e: any) => {
        e.preventDefault();

        const service = new EnderecoService();
        service.alterarEnderecoSalvo(idEndereco, nome, numero, complemento);

        setExibirModal(true);
    }

    const irParaSalvos = () => {
        navigate('/salvos');
        return;
    }

    return (
        <div className="container alterar">
            <div className="row">
                <div className="col-md-12 mb-3 alterar-voltar">
                    <Link to="/salvos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        Voltar
                    </Link>
                </div>
                <div className="col-md-12 mb-3">
                    <h4>Alterar endereço</h4>
                </div>
                <form onSubmit={alterarEndereco}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="nome">Nome do endereço</label>
                        <input
                            className="form-control"
                            placeholder="Nome do endereço"
                            id="nome"
                            value={nome}
                            onChange={ev => setNome(ev.target.value)}
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
                                value={cep}
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <CamposComplementares
                        bairro={bairro}
                        cidade={cidade}
                        complemento={complemento === null ? '' : complemento}
                        logradouro={logradouro}
                        numero={numero}
                        uf={uf}
                        tratarComplemento={tratarComplemento}
                        tratarNumero={tratarNumero}
                    />

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={nome === '' || nome === null || numero === '' || numero === null}
                        >
                            Alterar
                        </button>
                    </div>
                </form>
            </div>

            <ModalOk
                titulo={'Confirmação de alteração'}
                texto={'Endereço alterado com sucesso!'}
                classesBotaoPositivo={'btn btn-success'}
                textoBotaoPositivo={'Ok'}
                funcaoBotaoPositivo={irParaSalvos}
                exibir={exibirModal}
            />
        </div>
    );
}

export default Alterar;
