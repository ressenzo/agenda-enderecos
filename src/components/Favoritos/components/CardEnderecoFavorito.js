import CardInformacoes from "../../CardInformacoes/CardInformacoes";

function CardEnderecoFavorito({
    endereco,
    alterarFavorito
}) {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body">
                        <CardInformacoes endereco={endereco} />
                        <p className="text-right card-text">
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => {
                                    alterarFavorito(endereco.id);
                                }}
                            >
                                Remover
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardEnderecoFavorito;
