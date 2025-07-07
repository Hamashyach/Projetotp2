
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
        if (typeof name !== 'string' || name.trim().length === 0) {
            error += "O nome da pessoa é obrigatório. ";
        }
        if (typeof email !== 'string' || email.trim().length === 0) {
            error += "O e-mail da pessoa é obrigatório. ";
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
