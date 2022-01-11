import CamposComplementaresInterface from '../../../models/interfaces/CamposComplementaresInterface';

function CamposComplementares(dados: CamposComplementaresInterface) {
    return (
        <>
            <div className="mb-3">
                <label className="form-label" htmlFor="logradouro">Logradouro</label>
                <input
                    readOnly={true}
                    className="form-control"
                    placeholder="Logradouro"
                    id="logradouro"
                    value={dados.logradouro}
                />
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="numero">Número</label>
                        <input
                            className="form-control"
                            placeholder="Número"
                            id="numero"
                            onChange={ev => dados.tratarNumero(ev.target.value)}
                            value={dados.numero}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="complemento">Complemento</label>
                        <input
                            className="form-control"
                            placeholder="Complemento"
                            id="complemento"
                            onChange={ev => dados.tratarComplemento(ev.target.value)}
                            value={dados.complemento}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="bairro">Bairro</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            placeholder="Bairro"
                            id="bairro"
                            value={dados.bairro}
                        />
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cidade">Cidade</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            placeholder="Cidade"
                            id="cidade"
                            value={dados.cidade}
                        />
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="uf">UF</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            placeholder="UF"
                            id="uf"
                            value={dados.uf}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CamposComplementares;
