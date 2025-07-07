export class LoginRequestDto {
    email: string; // Alterado de idPessoa para email
    senha: string;

    constructor(email?: string, senha?: string) {
        this.email = email || '';
        this.senha = senha || '';
    }
}