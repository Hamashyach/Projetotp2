import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { ILoginService } from "./ILoginService";
import { LoginService } from "./LoginService";

export class LoginServiceProxy implements ILoginService {
    private loginService: LoginService;
    private cache: { [key: string]: UsuarioEntity } = {};

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    public async login(idPessoa: number, senha: string): Promise<UsuarioEntity | null> {
        const cacheKey = `${idPessoa}:${senha}`;

        // 1. Adicionando funcionalidade de Cache
        if (this.cache[cacheKey]) {
            console.log("Retornando usuário do cache via Proxy...");
            return this.cache[cacheKey];
        }

        // 2. Adicionando funcionalidade de Log
        console.log(`[Proxy] Tentativa de login para o usuário com ID Pessoa: ${idPessoa}`);

        const usuario = await this.loginService.login(idPessoa, senha);

        if (usuario) {
            console.log("Login bem-sucedido. Armazenando no cache...");
            this.cache[cacheKey] = usuario;
        } else {
            console.log("Login falhou.");
        }

        return usuario;
    }
}