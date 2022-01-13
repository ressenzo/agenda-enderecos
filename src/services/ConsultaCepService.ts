import ResultadoConsultaCepInterface from "../models/interfaces/ResultadoConsultaCepInterface";

export default class ConsultaCepService {

    public async consultarCep(cep: string): Promise<ResultadoConsultaCepInterface> {

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET'
            });
            
            return await (response.json() as Promise<ResultadoConsultaCepInterface>);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
