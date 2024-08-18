import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT FOREING KEY,
            senha VARCHAR(255) NOT NULL
            )`;

            try{
                const resultado = await executarComandoSQL(query, []);
                console.log('Query executada com sucesso', resultado);

            }catch (err){
                console.error('Erro');
            }
            
    }

    async insertUsuario(usuario:UsuarioEntity): Promise<UsuarioEntity>{
        const query = "INSERT INTO usuario (idPessoa, senha) VALUES (?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuario inserido com sucesso, ID ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })

        }catch (err) {
            console.error('Erro ao inserir usuario: ', err);
            throw err;
        }
    }

    async updateUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>{
        const query = "UPDATE usuario set idPessoa = ?, senha = ? where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha, usuario.id]);
            console.log('Usuario atualizada com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity> ((resolve) =>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }

    } 
    
    async deletarUsuario(usuario: UsuarioEntity):Promise<UsuarioEntity>{
        const query = "DELETE FROM usuario where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('Usuario deletada com sucesso: ', usuario);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any){
            console.error(`Falha ao deletar pessoa de ID ${usuario.id} gerando o erro:  ${err}`);
            throw err;
        }
    }

    async filterusuarioById(id: number):Promise<UsuarioEntity>{
        const query = "SELECT * FROM usuario where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Usuario localizada com sucesso ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve) =>{
                resolve(resultado);
            })

        }catch (err:any){
            console.error(`Falha ao procurar usuario de ID ${id} gerando o erro${err}`);
            throw err;
        }

    }

    async filterAllUsuarios(): Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any){
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioByIdPessoa(idPessoa: number): Promise<UsuarioEntity | null> {
        const query = "SELECT * FROM usuario WHERE idPessoa = ?";

        try {
            const resultado = await executarComandoSQL(query, [idPessoa]);
            if (resultado.length > 0) {
                return resultado[0];
            }
            return null;
        } catch (err: any) {
            console.error(`Falha ao procurar usuário com idPessoa ${idPessoa}: ${err}`);
            throw err;
        }
    }



}



