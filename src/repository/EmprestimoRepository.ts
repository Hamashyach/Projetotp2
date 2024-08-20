import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository{


    constructor(){
        this.createTable();
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livroId INT NOT NULL,
            usuarioId INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL,
            FOREIGN KEY (livroId) REFERENCES livro(id),
            FOREIGN KEY (usuarioId) REFERENCES usuario(id)
        )`;

            try {
                const resultado = await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
            } catch (err) {
                console.error('Error');
            }

    }
    async insertEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "INSERT INTO emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo inserido com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir emprestimo:', err);
            throw err;
        }
    }

    async updateEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "UPDATE emprestimo set livroId= ?, usuarioid = ?, dataEmprestimo = ?, dataDevolucao = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.id]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "DELETE FROM emprestimo where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log('Emprestimo deletado com sucesso: ', emprestimo);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoById(id: number) :Promise<EmprestimoEntity>{
        const query = "SELECT * FROM emprestimo where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterProductByDataEmprestimo(dataEmprestimo: Date) :Promise<EmprestimoEntity[]>{
        const query = "SELECT * FROM emprestimo where dataEmprestimo = ?" ;

        try {
            const resultado:EmprestimoEntity[] = await executarComandoSQL(query, [dataEmprestimo]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo ${dataEmprestimo} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllEmprestimo() :Promise<EmprestimoEntity[]>{
        const query = "SELECT * FROM emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<EmprestimoEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os emprestimo gerando o erro: ${err}`);
            throw err;
        }
    }

    
}

    
