export default interface ModalOkInterface {
    titulo: string;
    texto: string;
    classesBotaoPositivo: string;
    textoBotaoPositivo: string;
    exibir: boolean;
    funcaoBotaoPositivo: () => void;
}
