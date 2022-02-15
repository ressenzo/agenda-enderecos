import CardEnderecoFavoritoInterface from "../../models/interfaces/CardEnderecoFavoritoInterface";
import CardInformacoes from "../CardInformacoes/CardInformacoes";

function CardEnderecoFavorito(dados: CardEnderecoFavoritoInterface) {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body">
                        <CardInformacoes endereco={dados.endereco} />
                        <p className="text-right card-text">
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => {
                                    dados.alterarFavorito(dados.endereco.id);
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
