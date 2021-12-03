import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnderecoService from '../../services/EnderecoService';
import CardEnderecoFavorito from "./components/CardEnderecoFavorito";

function Favoritos() {

    const [favoritos, setFavoritos] = useState([]);


    useEffect(() => {
        const service = new EnderecoService();
        const favoritos = service.obterEnderecosFavoritos();
        const salvos = service.obterEnderecosSalvos();

        const favoritosFinal = [];
        salvos.forEach(salvo => {
            if (favoritos.findIndex(x => x === salvo.id) >= 0) {
                favoritosFinal.push(salvo);
            }
        });

        setFavoritos(favoritosFinal);
    }, [])

    const removerFavorito = id => {

        const service = new EnderecoService();
        service.removerFavorito(id);

        const todosFavoritos = favoritos;
        const indiceFavorito = todosFavoritos.findIndex(x => x.id === id);
        todosFavoritos.splice(indiceFavorito, 1);

        setFavoritos([...todosFavoritos]);
    }

    return (
        <div className="favoritos container">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h4>Favoritos</h4>
                </div>

                {
                    favoritos.length > 0 ?
                        favoritos
                        .sort((fav1, fav2) => {
                            return (fav1.id > fav2.id) ? 1 : ((fav2.id > fav1.id) ? -1 : 0);
                        })
                        .map((fav, i) => {
                            return (
                                <div className="col-md-12" key={i}>
                                    <CardEnderecoFavorito
                                        key={i}
                                        endereco={fav}
                                        alterarFavorito={removerFavorito}
                                    />
                                </div>
                            );
                        }) :

                        <p>Nenhum endereço favorito. Vá até a página de <Link to="/salvos">Endereços Salvos</Link> e marque um como favorito.</p>
                }
            </div>
        </div>
    );
}

export default Favoritos;
