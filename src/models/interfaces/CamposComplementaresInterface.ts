export default interface CamposComplementaresInterface {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    tratarNumero: (numero: string) => void;
    tratarComplemento: (complemento: string) => void;
}
