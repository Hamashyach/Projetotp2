import { CategoriaRepository } from "../../repository/CategoriaRepository";
import { EmprestimoRepository } from "../../repository/EmprestimoRepository";
import { LivroRepository } from "../../repository/LivroRepository";
import { PessoaRepository } from "../../repository/PessoaRepository";
import { UsuarioRepository } from "../../repository/UsuarioRepository";
import { ICategoriaRepository } from "../../repository/interfaces/ICategoriaRepository";
import { IEmprestimoRepository } from "../../repository/interfaces/IEmprestimoRepository";
import { ILivroRepository } from "../../repository/interfaces/ILivroRepository";
import { IPessoaRepository } from "../../repository/interfaces/IPessoarepository";
import { IUsuarioRepository } from "../../repository/interfaces/IUsuarioRepository";
import { IRepositoryFactory } from "./IRepositoryFactory";

export class RepositoryFactory implements IRepositoryFactory {
    createCategoriaRepository(): ICategoriaRepository {
        return new CategoriaRepository();
    }
    createEmprestimoRepository(): IEmprestimoRepository {
        return new EmprestimoRepository();
    }
    createLivroRepository(): ILivroRepository {
        return new LivroRepository();
    }
    createPessoaRepository(): IPessoaRepository {
        return new PessoaRepository();
    }
    createUsuarioRepository(): IUsuarioRepository {
        return new UsuarioRepository();
    }
}