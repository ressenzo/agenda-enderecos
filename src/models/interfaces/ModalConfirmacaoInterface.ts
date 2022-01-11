export default interface ModalConfirmacaoInterface {
    titulo: string;
    texto: string;
    classesBotaoNegativo: string;
    textoBotaoNegativo: string;
    classesBotaoPositivo: string;
    textoBotaoPositivo: string;
    exibir: boolean;
    funcaoBotaoNegativo: () => void;
    funcaoBotaoPositivo: () => void;
}
