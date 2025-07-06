import { ICategoriaRepository } from "../../repository/interfaces/ICategoriaRepository";
import { IEmprestimoRepository } from "../../repository/interfaces/IEmprestimoRepository";
import { ILivroRepository } from "../../repository/interfaces/ILivroRepository";
import { IPessoaRepository } from "../../repository/interfaces/IPessoarepository";
import { IUsuarioRepository } from "../../repository/interfaces/IUsuarioRepository";

export interface IRepositoryFactory {
    createCategoriaRepository(): ICategoriaRepository;
    createEmprestimoRepository(): IEmprestimoRepository;
    createLivroRepository(): ILivroRepository;
    createPessoaRepository(): IPessoaRepository;
    createUsuarioRepository(): IUsuarioRepository;
}