import { Modal } from "bootstrap";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const ModalConfirmacao = forwardRef((opcoes, ref) => {

    const [modal, setModal] = useState(null);
    const modalConfirmacao = useRef();

    useEffect(() => {
        const classeModal = new Modal(modalConfirmacao.current);
        setModal(classeModal);
    }, [])

    useImperativeHandle(ref, () => ({
        exibirModal() {
            modal.show();
        }
    }))

    const acaoNegativa = () => {
        opcoes.funcaoBotaoNegativo();
        esconderModal();
    }

    const acaoPositiva = () => {
        opcoes.funcaoBotaoPositivo();
        esconderModal();
    }

    const esconderModal = () => {
        modal.hide();
    }

    return (
        <div className="modal fade" ref={modalConfirmacao} tabIndex="-1" aria-labelledby="modal-confirmacao" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-confirmacao">{opcoes.titulo}</h5>
                        <button type="button" className="btn-close" onClick={() => acaoNegativa()} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{opcoes.texto}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={opcoes.classesBotaoNegativo} onClick={() => acaoNegativa()}>{opcoes.textoBotaoNegativo}</button>
                        <button type="button" className={opcoes.classesBotaoPositivo} onClick={() => acaoPositiva()}>{opcoes.textoBotaoPositivo}</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default ModalConfirmacao;
