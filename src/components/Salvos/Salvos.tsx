import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Endereco } from '../../models/interfaces/EnderecoInterface';
import EnderecoService from '../../services/EnderecoService';
import ModalConfirmacao from '../Modals/ModalConfirmacao';
import CardEnderecoSalvo from './Components/CardEnderecoSalvo';

function Salvos() {

    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [favoritos, setFavoritos] = useState<number[]>([]);

    const [nomeExclusao, setNomeExclusao] = useState('');
    const [idExclusao, setIdExclusao] = useState(0);

    const modalConfirmacao = useRef();

    useEffect(() => {
        const service = new EnderecoService();
        const enderecosSalvos = service.obterEnderecosSalvos();
        setEnderecos(enderecosSalvos);
    }, [])

    useEffect(() => {
        const service = new EnderecoService();
        const enderecosFavoritos = service.obterEnderecosFavoritos();
        setFavoritos(enderecosFavoritos);
    }, []);

    const alterarFavorito = (id: number) => {
        const service = new EnderecoService();
        service.alterarSituacaoFavorito(id);
    }

    const exibirModalExclusao = (id: number, nome: string) => {
        setNomeExclusao(nome);
        setIdExclusao(id);
        exibirModal();
    }

    const exibirModal = () => {
        //modalConfirmacao.current.exibirModal();
    }

    const excluir = () => {
        const service = new EnderecoService();
        service.removerEnderecoSalvo(idExclusao);

        const indiceEndereco = enderecos.findIndex(x => x.id === idExclusao);
        enderecos.splice(indiceEndereco, 1);

        setEnderecos([...enderecos]);
    }

    const naoExcluir = () => {
        setNomeExclusao('');
        setIdExclusao(0);
    }

    return (
        <div className="salvos container">
            <div className="row">

                <div className="col-md-12 mb-3">
                    <h4>Endereços salvos</h4>
                </div>

                {
                    enderecos.length > 0 ?
                        enderecos
                        .sort((end1, end2) => {
                            return (end1.id > end2.id) ? 1 : ((end2.id > end1.id) ? -1 : 0);
                        })
                        .map((endereco, i) => {
                            return (
                                <div className="col-md-12" key={i}>
                                    <CardEnderecoSalvo
                                        endereco={endereco}
                                        ehFavorito={favoritos.some(x => x === endereco.id)}
                                        alterarFavorito={alterarFavorito}
                                        excluir={exibirModalExclusao}
                                    />
                                </div>
                            );
                        }) :

                        <p>Nenhum endereço salvo. Vá até o <Link to="/">Início</Link> e adicione um.</p>
                }

                {/* <ModalConfirmacao
                    ref={modalConfirmacao}
                    titulo={'Confirmação de exclusão'}
                    texto={`Deseja excluir o endereço "${nomeExclusao}"?`}
                    classesBotaoNegativo={'btn btn-primary'}
                    textoBotaoNegativo={'Cancelar'}
                    classesBotaoPositivo={'btn btn-danger'}
                    textoBotaoPositivo={'Excluir'}
                    funcaoBotaoNegativo={naoExcluir}
                    funcaoBotaoPositivo={excluir}
                /> */}
            </div>
        </div>
    );
}

export default Salvos;
