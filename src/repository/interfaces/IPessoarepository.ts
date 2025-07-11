import { PessoaEntity } from "../../model/entity/PessoaEntity";

export interface IPessoaRepository {
    insertPessoa(pessoa: PessoaEntity): Promise<PessoaEntity>;
    updatePessoa(pessoa: PessoaEntity): Promise<PessoaEntity>;
    deletarPessoa(pessoa: PessoaEntity): Promise<PessoaEntity>;
    filterPessoaById(id: number): Promise<PessoaEntity | null>;
    filterPessoaByName(name: string): Promise<PessoaEntity[]>;
    findPessoaByEmail(email: string): Promise<PessoaEntity | null>;
    filterAllPessoas(): Promise<PessoaEntity[]>;
}