import { Modal } from "react-bootstrap";
import ModalOkInterface from "../../models/interfaces/ModalOkInterface";


function ModalOk(dados: ModalOkInterface) {

    const esconder = (): void | undefined => {
        dados.funcaoBotaoPositivo();
    }

    return (
        <Modal show={dados.exibir} onHide={esconder}>
            <Modal.Header closeButton>
                <Modal.Title>{dados.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{dados.texto}</p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className={dados.classesBotaoPositivo} onClick={() => dados.funcaoBotaoPositivo()}>{dados.textoBotaoPositivo}</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalOk;

