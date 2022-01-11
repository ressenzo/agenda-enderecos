import { Endereco } from "./EnderecoInterface";

export default interface CardEnderecoFavoritoInterface {
    endereco: Endereco;
    alterarFavorito: (id: number) => void;
}
