export default interface FormularioLoginInterface {
    onChangeEmail: (valor: string) => void;
    onChangeSenha: (valor: string) => void;
    tituloFormulario: string;
    aoClicarBotao: () => void;
    exibirLoading: boolean;
    textoBotao: string;
    children?: JSX.Element;
}
