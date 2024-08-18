import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { PessoaRepository } from "../repository/PessoaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{

    usuarioRepository: UsuarioRepository = new UsuarioRepository();
    pessoaRepository: PessoaRepository = new PessoaRepository();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity>{
        const {idPessoa, senha} = usuarioData;

        const pessoa = await this.pessoaRepository.filterPessoaById(idPessoa);
        if (!pessoa) {
            throw new Error(`Pessoa com ID ${idPessoa} não existe.`);
        }

        const usuarioExistente = await this.usuarioRepository.filterUsuarioByIdPessoa(idPessoa);
        if (usuarioExistente) {
            throw new Error(`Usuário para a pessoa com ID ${idPessoa} já existe.`);
        }
        
        const usuario = new UsuarioEntity(undefined, idPessoa, senha)

        const novoUsuario  = await this.usuarioRepository.insertUsuario(usuario);
        console.log("Service - insert", novoUsuario);
        return novoUsuario;
    }


    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const {id, idPessoa, senha} = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha)

        await this.usuarioRepository.updateUsuario(usuario);
        console.log("Service - Update", usuario);
        return usuario;


    }

    async deletarusuario(usuarioData: any): Promise<UsuarioEntity> {
        const {id, idPessoa, senha} = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa,senha)

        await this.usuarioRepository.deletarUsuario(usuario);
        console.log("Service - Delete", usuario);
        return usuario;
    }

    async filtrarUsuarioById(usuarioData: any): Promise<UsuarioEntity> {
        const idNumber = parseInt(usuarioData, 10);

        const usuario = await this.usuarioRepository.filterusuarioById(idNumber);
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        const usuario = await this.usuarioRepository.filterAllUsuarios();
        console.log("Services - Filtrar Todos", usuario);
        return usuario;
        

    }


}