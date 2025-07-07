// Em src/service/LoginService.ts
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { IUsuarioRepository } from "../repository/interfaces/IUsuarioRepository"; // Importe a interface
import { RepositoryFactory } from "../patterns/factory/RepositoryFactory"; // Importe a fábrica
import { ILoginService } from "./ILoginService";

export class LoginService implements ILoginService {
    // Use a fábrica para criar o repositório
    private usuarioRepository: IUsuarioRepository = new RepositoryFactory().createUsuarioRepository();

    // Alterado para receber email
    public async login(email: string, senha: string): Promise<UsuarioEntity | null> {
        console.log("Executando a lógica de login principal...");
        // Usa o novo método de busca por e-mail
        const usuario = await this.usuarioRepository.findUsuarioByEmail(email);

        if (usuario && usuario.senha === senha) {
            return usuario;
        }

        return null;
    }
}