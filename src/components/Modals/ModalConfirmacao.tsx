import { Modal } from "react-bootstrap";
import ModalConfirmacaoInterface from '../../models/interfaces/ModalConfirmacaoInterface';

function ModalConfirmacao(dados: ModalConfirmacaoInterface) {

    const esconder = (): void | undefined => {
        dados.funcaoBotaoNegativo();
    }

    return (
        
        <Modal show={dados.exibir} onHide={esconder}>
            <Modal.Header closeButton>
                <Modal.Title>{dados.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dados.texto}
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className={dados.classesBotaoNegativo} onClick={() => dados.funcaoBotaoNegativo()}>{dados.textoBotaoNegativo}</button>
                <button type="button" className={dados.classesBotaoPositivo} onClick={() => dados.funcaoBotaoPositivo()}>{dados.textoBotaoPositivo}</button>
            </Modal.Footer>
        </Modal>
        
    );    
}

export default ModalConfirmacao;
