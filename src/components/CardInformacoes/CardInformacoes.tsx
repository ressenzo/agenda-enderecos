import CardInformacoesInterface from '../../models/interfaces/CardInformacoesInterface';

function CardInformacoes(dados: CardInformacoesInterface) {
    return (
        <>
            <h5 className="card-title">{dados.endereco.nome} - <small className="text-muted">{dados.endereco.cep}</small></h5>
            <p className="card-text">
                {dados.endereco.logradouro}, {dados.endereco.numero}{dados.endereco.complemento === '' ? null : `, ${dados.endereco.complemento}`}<br />
                {dados.endereco.bairro}<br />
                {dados.endereco.cidade} - {dados.endereco.uf}
            </p>
        </>
    );
}

export default CardInformacoes;
