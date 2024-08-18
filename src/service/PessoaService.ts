import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService{

    pessoaRepository: PessoaRepository = new PessoaRepository();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { name, email} = pessoaData;
        
        const pessoa = new PessoaEntity(undefined, name, email)

        const novaPessoa =  await this.pessoaRepository.insertPessoa(pessoa);
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, name, email } = pessoaData;

        const pessoa = new PessoaEntity(id, name, email)

        await this.pessoaRepository.updatePessoa(pessoa);
        console.log("Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, name, email } = pessoaData;

        const pessoa = new PessoaEntity(id, name, email)

        await this.pessoaRepository.deletarPessoa(pessoa);
        console.log("Service - Delete ", pessoa);
        return pessoa;
    }

    async filtrarPessoaById(pessoaData: any): Promise<PessoaEntity> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.filterPessoaById(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async filtrarPessoaByName(pessoaData: any): Promise<PessoaEntity[]> {
        const name:string = pessoaData;

        const pessoa =  await this.pessoaRepository.filterPessoaByName(name);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarTodasPessoas(): Promise<PessoaEntity[]> {
        const pessoa =  await this.pessoaRepository.filterAllPessoas();
        console.log("Service - Filtrar Todos", pessoa);
        return pessoa;
    }

}
