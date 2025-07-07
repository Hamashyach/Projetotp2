import { EmprestimoEntity } from "../../model/entity/EmprestimoEntity";

export interface IEmprestimoRepository {
    insertEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>;
    updateEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>;
    deleteEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>;
    filterEmprestimoById(id: number): Promise<EmprestimoEntity | null>;
    filterAllEmprestimos(): Promise<EmprestimoEntity[]>;
    countEmprestimosByUsuarioId(usuarioId: number): Promise<number>;
    findAtivoByLivroId(livroId: number): Promise<EmprestimoEntity | null>;
    filterEmprestimosByNomePessoa(nome: string): Promise<EmprestimoEntity[]>;
    filterEmprestimosByData(data: Date): Promise<EmprestimoEntity[]>;

}