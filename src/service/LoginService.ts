import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { ILoginService } from "./ILoginService";

export class LoginService implements ILoginService {
    private usuarioRepository = new UsuarioRepository();

    public async login(idPessoa: number, senha: string): Promise<UsuarioEntity | null> {
        console.log("Executando a lógica de login principal...");
        const usuario = await this.usuarioRepository.filterUsuarioByIdPessoa(idPessoa);

        if (usuario && usuario.senha === senha) {
            return usuario;
        }

        return null;
    }
}
