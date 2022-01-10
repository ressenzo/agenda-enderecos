export default interface ModalConfirmacaoInterface {
    ref: React.ForwardedRef<any>;
    titulo: string;
    texto: string;
    classesBotaoNegativo: string;
    textoBotaoNegativo: string;
    classesBotaoPositivo: string;
    textoBotaoPositivo: string;
    funcaoBotaoNegativo: () => void;
    funcaoBotaoPositivo: () => void;
}
