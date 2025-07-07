import { IRepositoryFactory } from "../patterns/factory/IRepositoryFactory";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { IEmprestimoRepository } from "../repository/interfaces/IEmprestimoRepository";
import { ILivroRepository } from "../repository/interfaces/ILivroRepository";
import { IUsuarioRepository } from "../repository/interfaces/IUsuarioRepository";
import { IObserver } from "../patterns/observer/IObserver"; // Importar


export class EmprestimoService {
    private emprestimoRepository: IEmprestimoRepository;
    private usuarioRepository: IUsuarioRepository;
    private livroRepository: ILivroRepository;

    private observers: IObserver[] = [];

    constructor(factory: IRepositoryFactory) {
        this.emprestimoRepository = factory.createEmprestimoRepository();
        this.usuarioRepository = factory.createUsuarioRepository();
        this.livroRepository = factory.createLivroRepository();
    }

    public registerObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    public unregisterObserver(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers(data: any): void {
        console.log("[Subject] Notificando observers...");
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

     async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        const LIMITE_EMPRESTIMOS = 5; 

        const emprestimosAtuais = await this.emprestimoRepository.countEmprestimosByUsuarioId(usuarioId);
        if (emprestimosAtuais >= LIMITE_EMPRESTIMOS) {
            throw new Error(`Usuário já atingiu o limite de ${LIMITE_EMPRESTIMOS} empréstimos.`);
        }

        const emprestimoExistente = await this.emprestimoRepository.findAtivoByLivroId(livroId);
        if (emprestimoExistente) {
            throw new Error(`O livro com ID ${livroId} já está emprestado.`);
        }

        const usuario = await this.usuarioRepository.filterusuarioById(usuarioId);
        if (!usuario) {
            throw new Error(`usuario com ID ${usuarioId} não existe.`);
        }

        const livro = await this.livroRepository.filterLivroById(livroId);
        if (!livro) {
            throw new Error(`livro com ID ${livroId} não existe.`);
        }

        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao);
        const novoEmprestimo = await this.emprestimoRepository.insertEmprestimo(emprestimo);

        // Notificar todos os observers após o sucesso do cadastro
        this.notifyObservers(novoEmprestimo);

        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao)

        await this.emprestimoRepository.updateEmprestimo(emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao)
        await this.emprestimoRepository.deleteEmprestimo(emprestimo)
        return emprestimo;
    }

    async filtrarEmprestimoById(id: number): Promise<EmprestimoEntity | null> {
        return await this.emprestimoRepository.filterEmprestimoById(id);
    }


    async listarTodosEmprestimo(): Promise<EmprestimoEntity[]> {
        return await this.emprestimoRepository.filterAllEmprestimos();
    }

}