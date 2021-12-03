function CardInformacoes({ endereco }) {
    return (
        <>
            <h5 className="card-title">{endereco.nome} - <small className="text-muted">{endereco.cep}</small></h5>
            <p className="card-text">
                {endereco.logradouro}, {endereco.numero}{endereco.complemento === '' ? null : `, ${endereco.complemento}`}<br />
                {endereco.bairro}<br />
                {endereco.cidade} - {endereco.uf}
            </p>
        </>
    );
}

export default CardInformacoes;
