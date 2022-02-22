import ResultadoLogarInterface from "../models/interfaces/ResultadoLogarInterface";

export default class UsuarioService {

    public async logar(email: string, senha: string): Promise<ResultadoLogarInterface> {

        try {
            const retorno: ResultadoLogarInterface = {
                ehPremium: true,
                email
            };
    
            localStorage.setItem('agenda-enderecos_usuario-logado', JSON.stringify(retorno));
    
            return retorno;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
