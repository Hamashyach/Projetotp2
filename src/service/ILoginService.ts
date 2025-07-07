import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export interface ILoginService {
    login(email: string, senha: string): Promise<UsuarioEntity | null>;
}