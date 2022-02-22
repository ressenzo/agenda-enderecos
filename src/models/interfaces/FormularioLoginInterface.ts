export default interface FormularioLoginInterface {
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeEmail: (valor: string) => void;
    onChangeSenha: (valor: string) => void;
    tituloFormulario: string;
    exibirLoading: boolean;
    textoBotao: string;
    children?: JSX.Element;
}
