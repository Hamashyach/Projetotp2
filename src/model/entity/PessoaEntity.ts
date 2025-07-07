
export class PessoaEntity{
    id: number;
    name: string;
    email: string;

    constructor(id?:number, name?:string, email?:string){
        this.validatesInformation(name, email);
        this.id = id ||0;
        this.name = name || '';
        this.email = email || '';
    }

    private validatesInformation(name: any, email: any){
        let error ='';
        if (typeof name !== 'string' || typeof email !== 'string'){
            error +=("Informações incompletas ou incorretas");
        }
        if (typeof this.name !== 'string' || this.name.trim().length === 0) {
            throw new Error("O nome da pessoa é obrigatório.");
        }
        if (typeof this.email !== 'string' || this.email.trim().length === 0) {
            throw new Error("O e-mail da pessoa é obrigatório.");
        }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email === 'string' && !emailRegex.test(email)) {
            error += "O formato do e-mail é inválido. ";
        }

        if(error !== ''){
            throw new Error(error);
        }
    }
}
