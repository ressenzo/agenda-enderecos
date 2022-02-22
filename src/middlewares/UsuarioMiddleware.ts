import ResultadoLogarInterface from "../models/interfaces/ResultadoLogarInterface";
import UsuarioService from "../services/UsuarioService";

export default class UsuarioMiddleware {

    public async logar(email: string, senha: string): Promise<ResultadoLogarInterface> {

        const service = new UsuarioService();

        return service.logar(email, senha)
        .then((usuario: ResultadoLogarInterface) => {
            localStorage.setItem('agenda-enderecos_usuario-logado', JSON.stringify(usuario));
            return usuario;
        })
        .catch((err: any) => {
            throw new Error(err);
        })
    }
}
