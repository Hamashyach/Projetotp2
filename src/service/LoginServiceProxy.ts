// Em src/service/LoginServiceProxy.ts
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { ILoginService } from "./ILoginService";
import { LoginService } from "./LoginService";

export class LoginServiceProxy implements ILoginService {
    private loginService: LoginService;
    private cache: { [key: string]: UsuarioEntity } = {};

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    // Alterado para receber email
    public async login(email: string, senha: string): Promise<UsuarioEntity | null> {
        // A chave do cache agora usa o email
        const cacheKey = `${email}:${senha}`;

        if (this.cache[cacheKey]) {
            console.log("Retornando usuário do cache via Proxy...");
            return this.cache[cacheKey];
        }

        console.log(`[Proxy] Tentativa de login para o email: ${email}`);
        const usuario = await this.loginService.login(email, senha);

        if (usuario) {
            console.log("Login bem-sucedido. Armazenando no cache...");
            this.cache[cacheKey] = usuario;
        } else {
            console.log("Login falhou.");
        }

        return usuario;
    }
}