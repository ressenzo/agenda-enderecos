import { Endereco } from "../models/interfaces/EnderecoInterface";

const CHAVE_ENDERECOS = 'enderecos-salvos';
const CHAVE_ENDERECOS_FAVORITOS = 'enderecos-favoritos';

export default class EnderecoService {

    public adicionarEndereco(endereco: Endereco): void {
        const enderecosSalvos = this.obterEnderecosSalvos();
        const enderecos = [...enderecosSalvos];
        enderecos.push(endereco);

        this.salvarEnderecosSalvos(enderecos);
    }

    public obterEnderecosSalvos(): Endereco[] {
        const enderecos = JSON.parse(localStorage.getItem(CHAVE_ENDERECOS) || '{}');
        
        if (!enderecos.length || enderecos.length === 0) {
            return [];
        }

        return enderecos as Endereco[];
    }

    public obterEnderecoSalvo(id: number): Endereco {
        const enderecos = this.obterEnderecosSalvos();
        return enderecos.filter((x: Endereco) => x.id === id)[0];
    }

    public salvarEnderecosSalvos(enderecos: Endereco[]): void {
        localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(enderecos));
    }

    public procurarEnderecoSalvo(cep: string): boolean {
        const enderecos = this.obterEnderecosSalvos();

        if (enderecos.some((x: Endereco) => x.cep === cep)) {
            return true;
        }

        return false;
    }

    public removerEnderecoSalvo(id: number): void {
        const enderecosSalvos = this.obterEnderecosSalvos();

        const indiceEndereco = enderecosSalvos.findIndex((x: Endereco) => x.id === id);
        enderecosSalvos.splice(indiceEndereco, 1);
        this.salvarEnderecosSalvos(enderecosSalvos);

        this.removerFavorito(id);
    }

    public alterarEnderecoSalvo(id: number,
            nome: string,
            numero: string,
            complemento: string): void {
        const enderecos = this.obterEnderecosSalvos();
        const enderecoParaAlterar = enderecos.filter((x: Endereco) => x.id === id)[0];
        
        const indiceEndereco = enderecos.findIndex((x: Endereco) => x.id === id);
        enderecos.splice(indiceEndereco, 1);
        
        const enderecoAlterado: Endereco = { 
            ...enderecoParaAlterar,
            nome: nome,
            numero: numero,
            complemento: complemento
        };

        enderecos.push(enderecoAlterado);

        this.salvarEnderecosSalvos(enderecos);
    }

    public alterarSituacaoFavorito(id: number): void {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex((x: number) => x === id);
        if (indiceFavorito > -1) {
            favoritos.splice(indiceFavorito, 1);
        } else {
            favoritos.push(id);
        }
        
        this.salvarEnderecosFavoritos(favoritos)
    }

    public removerFavorito(id: number): void {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex((x: number) => x === id);

        if (indiceFavorito >= 0) {
            favoritos.splice(indiceFavorito, 1);
            this.salvarEnderecosFavoritos(favoritos);
        }
    }

    public obterEnderecosFavoritos(): number[] {
        const favoritos = JSON.parse(localStorage.getItem(CHAVE_ENDERECOS_FAVORITOS) || '{}');

        if (!favoritos.length || favoritos.length === 0) {
            return [];
        }

        return favoritos as number[];
    }

    public salvarEnderecosFavoritos(enderecos: number[]): void {
        localStorage.setItem(CHAVE_ENDERECOS_FAVORITOS, JSON.stringify(enderecos));
    }
}
