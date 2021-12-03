import { Modal } from "bootstrap";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const ModalOk = forwardRef((opcoes, ref) => {

    const [modal, setModal] = useState(null);
    const modalOk = useRef();

    useEffect(() => {
        const classeModal = new Modal(modalOk.current);
        setModal(classeModal);
    }, [])

    useImperativeHandle(ref, () => ({
        exibirModal() {
            modal.show();
        },
        esconderModal() {
            modal.hide();
        }
    }))

    const acaoOk = () => {
        opcoes.funcaoOk();
        esconderModal();
    }

    const esconderModal = () => {
        modal.hide();
    }

    return (
        <div className="modal fade" ref={modalOk} tabIndex="-1" aria-labelledby="modal-confirmacao" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-confirmacao">{opcoes.titulo}</h5>
                        <button type="button" className="btn-close" onClick={() => acaoOk()} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{opcoes.texto}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={opcoes.classesBotaoPositivo} onClick={() => acaoOk()}>{opcoes.textoBotaoPositivo}</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default ModalOk;

