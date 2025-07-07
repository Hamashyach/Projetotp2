export class UsuarioEntity {
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id?: number, idPessoa?: number, senha?: string) {
        this.validatesInformation(idPessoa, senha);
        this.id = id || 0;
        this.idPessoa = idPessoa || 0;
        this.senha = senha || '';
    }

    private validatesInformation(idPessoa: any, senha: any) {
        let error = '';
        if (typeof idPessoa !== 'number' || typeof senha !== 'string') {
            error += ("Informações incompletas ou incorretas");
        }

        if (typeof senha === 'string' && senha.length < 6) {
            error += "A senha deve ter pelo menos 6 caracteres. ";
    }

        if (error !== '') {
            throw new Error(error);
        }
    }
}


