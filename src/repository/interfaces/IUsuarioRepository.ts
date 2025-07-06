import { UsuarioEntity } from "../../model/entity/UsuarioEntity";

export interface IUsuarioRepository {
    insertUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    updateUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    deletarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    filterusuarioById(id: number): Promise<UsuarioEntity | null>;
    filterAllUsuarios(): Promise<UsuarioEntity[]>;
    filterUsuarioByIdPessoa(idPessoa: number): Promise<UsuarioEntity | null>;
}