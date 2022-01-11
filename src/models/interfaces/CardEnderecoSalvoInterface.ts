import { Endereco } from "./EnderecoInterface";

export default interface CardEnderecoSalvoInterface {
    endereco: Endereco;
    ehFavorito: boolean;
    alterarFavorito: (id: number) => void;
    excluir: (id: number, nome: string) => void;
}
