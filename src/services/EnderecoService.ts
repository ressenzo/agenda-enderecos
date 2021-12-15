import { Endereco } from "../models/interfaces/EnderecoInterface";

const CHAVE_ENDERECOS = 'enderecos-salvos';
const CHAVE_ENDERECOS_FAVORITOS = 'enderecos-favoritos';

export default class EnderecoService {

    adicionarEndereco(endereco: Endereco): void {
        const enderecosSalvos = this.obterEnderecosSalvos();
        const enderecos = [...enderecosSalvos];
        enderecos.push(endereco);

        this.salvarEnderecosSalvos(enderecos);
    }

    obterEnderecosSalvos(): Endereco[] {
        const enderecos = JSON.parse(localStorage.getItem(CHAVE_ENDERECOS) || '{}');
        
        if (typeof enderecos === 'object') {
            return [];
        }

        return enderecos as Endereco[];
    }

    obterEnderecoSalvo(id: number): Endereco {
        const enderecos = this.obterEnderecosSalvos();
        return enderecos.filter((x: Endereco) => x.id === id)[0];
    }

    salvarEnderecosSalvos(enderecos: Endereco[]): void {
        localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(enderecos));
    }

    procurarEnderecoSalvo(cep: string): boolean {
        const enderecos = this.obterEnderecosSalvos();

        if (enderecos.some((x: Endereco) => x.cep === cep)) {
            return true;
        }

        return false;
    }

    removerEnderecoSalvo(id: number): void {
        const enderecosSalvos = this.obterEnderecosSalvos();

        const indiceEndereco = enderecosSalvos.findIndex((x: Endereco) => x.id === id);
        enderecosSalvos.splice(indiceEndereco, 1);
        this.salvarEnderecosSalvos(enderecosSalvos);

        this.removerFavorito(id);
    }

    alterarEnderecoSalvo(endereco: Endereco): void {
        const enderecos = this.obterEnderecosSalvos();
        const enderecoParaAlterar = enderecos.filter((x: Endereco) => x.id === endereco.id)[0];
        
        const indiceEndereco = enderecos.findIndex((x: Endereco) => x.id === endereco.id);
        enderecos.splice(indiceEndereco, 1);
        
        const enderecoAlterado = { 
            ...enderecoParaAlterar,
            nome: endereco.nome,
            numero: endereco.numero,
            complemento: endereco.complemento
        };

        enderecos.push(enderecoAlterado);

        this.salvarEnderecosSalvos(enderecos);
    }

    alterarSituacaoFavorito(id: number): void {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex((x: number) => x === id);
        if (indiceFavorito > -1) {
            favoritos.splice(indiceFavorito, 1);
        } else {
            favoritos.push(id);
        }
        
        this.salvarEnderecosFavoritos(favoritos)
    }

    removerFavorito(id: number): void {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex((x: number) => x === id);

        if (indiceFavorito >= 0) {
            favoritos.splice(indiceFavorito, 1);
            this.salvarEnderecosFavoritos(favoritos);
        }
    }

    obterEnderecosFavoritos(): number[] {
        const favoritos = JSON.parse(localStorage.getItem(CHAVE_ENDERECOS_FAVORITOS) || '{}');

        if (typeof favoritos === 'object') {
            return [];
        }

        return favoritos as number[];
    }

    salvarEnderecosFavoritos(enderecos: number[]): void {
        localStorage.setItem(CHAVE_ENDERECOS_FAVORITOS, JSON.stringify(enderecos));
    }
}
