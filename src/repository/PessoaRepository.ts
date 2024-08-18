import { executarComandoSQL } from "../database/mysql";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class PessoaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
            )`;

            try {
                const resultado = await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
            } catch (err) {
                console.error('Error');
            }
        }

        async insertPessoa(pessoa:PessoaEntity): Promise<PessoaEntity>{
            const query = "INSERT INTO pessoa (name, email) VALUES (?, ?)";

            try {
                const resultado = await executarComandoSQL(query, [pessoa.name, pessoa.email]);
                console.log('Pessoa inserida com sucesso, ID ', resultado.insertId);
                pessoa.id = resultado.insertId;
                return new Promise<PessoaEntity>((resolve)=>{
                    resolve(pessoa);
                })

            }catch (err) {
                console.error('Erro ao inserir a pessoa: ', err);
                throw err;
            }
        }

        async updatePessoa(pessoa: PessoaEntity): Promise<PessoaEntity>{
            const query = "UPDATE pessoa set name = ?, email = ? where id = ?";

            try {
                const resultado = await executarComandoSQL(query, [pessoa.name, pessoa.email, pessoa.id]);
                console.log('Pessoa atualizada com sucesso, ID: ', resultado);
                return new Promise<PessoaEntity> ((resolve) =>{
                    resolve(pessoa);
                })
            } catch (err:any) {
                console.error(`Erro ao atualizar a pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
                throw err;
            }

        } 
        
        async deletarPessoa(pessoa: PessoaEntity):Promise<PessoaEntity>{
            const query = "DELETE FROM pessoa where id = ?";

            try {
                const resultado = await executarComandoSQL(query, [pessoa.id]);
                console.log('Pessoa deletada com sucesso: ', pessoa);
                return new Promise<PessoaEntity>((resolve)=>{
                    resolve(pessoa);
                })
            } catch (err:any){
                console.error(`Falha ao deletar pessoa de ID ${pessoa.id} gerando o erro:  ${err}`);
                throw err;
            }
        }

        async filterPessoaById(id: number):Promise<PessoaEntity>{
            const query = "SELECT * FROM pessoa where id = ?";

            try {
                const resultado = await executarComandoSQL(query, [id]);
                console.log('Pessoa localizada com sucesso ID: ', resultado);
                return new Promise<PessoaEntity>((resolve) =>{
                    resolve(resultado);
                })
            }catch (err:any){
                console.error(`Falha ao procurar a pessoa de ID ${id} gerando o erro${err}`);
                throw err;
            }

        }

        async filterPessoaByName(name: string):Promise<PessoaEntity[]>{
            const query = "SELECT * FROM pessoa where name = ?";

            try {
                const resultado:PessoaEntity[] = await executarComandoSQL(query, [name]);
                console.log('Pessoa localizada com sucesso, ID: ', resultado);
                return new Promise<PessoaEntity[]>((resolve)=>{
                    resolve(resultado);
                })

            }catch (err:any){
                console.error(`Falha ao procurar a pessoa ${name} gerando o erro: ${err}`);
                throw err;
            }
        }

        async filterAllPessoas(): Promise<PessoaEntity[]>{
            const query = "SELECT * FROM pessoa";

            try {
                const resultado = await executarComandoSQL(query, []);
                return new Promise<PessoaEntity[]>((resolve)=>{
                    resolve(resultado);
                })
            } catch (err:any){
                console.error(`Falha ao listar as pessoas gerando o erro: ${err}`);
                throw err;
            }
        }



    }


