export default class UsuarioService {

    public async logar(email: string, senha: string) {

        const objeto: any = { email };
        localStorage.setItem('agenda-enderecos_usuario-logado', JSON.stringify(objeto));
    }
}
