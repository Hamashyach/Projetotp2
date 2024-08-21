import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class CategoriaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS categoria(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)NOT NULL
            )`;

            try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
            }catch (err) {
                console.error('Error');
            }
    }

    async insertCategoria(categoria:CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "INSERT INTO categoria (name) VALUES (?)" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.name]);
            console.log('Categoria inserida com sucesso, ID: ', resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err: any) {
            console.error('Erro ao inserir a categoria:', err);
            throw err;
        }
    }

    async updateCategoria(categoria:CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "UPDATE categoria set name = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.name, categoria.id]);
            console.log('Categoria atualizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteCategoria(categoria:CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "DELETE FROM categoria where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.id]);
            console.log('Produto deletado com sucesso: ', categoria);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaById(id: number) :Promise<CategoriaEntity>{
        const query = "SELECT * FROM categoria where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Categoria localizado com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a categoria de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaByName(name: string) :Promise<CategoriaEntity[]>{
        const query = "SELECT * FROM categoria where name = ?" ;

        try {
            const resultado:CategoriaEntity[] = await executarComandoSQL(query, [name]);
            console.log('Categoria localizado com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a categoria ${name} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllCategorias() :Promise<CategoriaEntity[]>{
        const query = "SELECT * FROM categoria" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<CategoriaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }
    }

    
}
