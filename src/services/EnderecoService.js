const CHAVE_ENDERECOS = 'enderecos-salvos';
const CHAVE_ENDERECOS_FAVORITOS = 'enderecos-favoritos';

export default class EnderecoService {

    adicionarEndereco(endereco) {
        const enderecosSalvos = this.obterEnderecosSalvos();
        const enderecos = [...enderecosSalvos];
        enderecos.push(endereco);

        this.salvarEnderecosSalvos(enderecos);
    }

    obterEnderecosSalvos() {
        return JSON.parse(localStorage.getItem(CHAVE_ENDERECOS)) ?? [];
    }

    obterEnderecoSalvo(id) {
        const enderecos = this.obterEnderecosSalvos();
        return enderecos.filter(x => x.id === parseInt(id))[0];
    }

    salvarEnderecosSalvos(enderecos) {
        localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(enderecos));
    }

    procurarEnderecoSalvo(cep) {
        const enderecos = this.obterEnderecosSalvos();

        if (enderecos.some(x => x.cep === cep)) {
            return true;
        }

        return false;
    }

    removerEnderecoSalvo(id) {
        const enderecosSalvos = this.obterEnderecosSalvos();

        const indiceEndereco = enderecosSalvos.findIndex(x => x.id === id);
        enderecosSalvos.splice(indiceEndereco, 1);
        this.salvarEnderecosSalvos(enderecosSalvos);

        this.removerFavorito(id);
    }

    alterarEnderecoSalvo(endereco) {
        const enderecos = this.obterEnderecosSalvos();
        const enderecoParaAlterar = enderecos.filter(x => x.id === parseInt(endereco.id))[0];
        
        const indiceEndereco = enderecos.findIndex(x => x.id === parseInt(endereco.id));
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

    alterarSituacaoFavorito(id) {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex(x => x === id);
        if (indiceFavorito > -1) {
            favoritos.splice(indiceFavorito, 1);
        } else {
            favoritos.push(id);
        }
        
        this.salvarEnderecosFavoritos(favoritos)
    }

    removerFavorito(id) {
        const favoritos = this.obterEnderecosFavoritos();

        const indiceFavorito = favoritos.findIndex(x => x === id);

        if (indiceFavorito >= 0) {
            favoritos.splice(indiceFavorito, 1);
            this.salvarEnderecosFavoritos(favoritos);
        }
    }

    obterEnderecosFavoritos() {
        return JSON.parse(localStorage.getItem(CHAVE_ENDERECOS_FAVORITOS)) ?? [];
    }

    salvarEnderecosFavoritos(enderecos) {
        localStorage.setItem(CHAVE_ENDERECOS_FAVORITOS, JSON.stringify(enderecos));
    }
}