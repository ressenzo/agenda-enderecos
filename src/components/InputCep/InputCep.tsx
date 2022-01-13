import React from "react";
import InputCepInterface from "../../models/interfaces/InputCepInterface";

export const TAMANHO_CEP: number = 9;

function InputCep(dados: InputCepInterface) {

    const tratarCep = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.maxLength = TAMANHO_CEP;
        let valor = e.currentTarget.value;
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
        e.currentTarget.value = valor;
        dados.setarCep(valor);
        return e;
    }

    return (
        <>
            <label className="form-label" htmlFor="cep">{dados.textoLabel}</label>
            <input
                className="form-control"
                placeholder={dados.placeholder}
                id="cep"
                onChange={ev => tratarCep(ev)}
            />
        </>
    );
}

export default InputCep;
