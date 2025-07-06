import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export interface ILoginService {
    login(idPessoa: number, senha: string): Promise<UsuarioEntity | null>;
}