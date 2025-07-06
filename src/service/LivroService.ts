import { LivroEntity } from "../model/entity/LivroEntity";
import { ILivroRepository } from "../repository/interfaces/ILivroRepository";
import { ICategoriaRepository } from "../repository/interfaces/ICategoriaRepository";
import { IRepositoryFactory } from "../patterns/factory/IRepositoryFactory";

export class LivroService {
    private livroRepository: ILivroRepository;
    private categoriaRepository: ICategoriaRepository;

    // O serviço agora depende da fábrica, não das classes concretas
    constructor(factory: IRepositoryFactory) {
        this.livroRepository = factory.createLivroRepository();
        this.categoriaRepository = factory.createCategoriaRepository();
    }

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { titulo, autor, categoriaId } = livroData;

        const categoria = await this.categoriaRepository.filterCategoriaById(categoriaId);
        if(!categoria){
            throw new Error(`Categoria com ID ${categoriaId} não encontrada.`)
        }
        const livro = new LivroEntity(undefined, titulo, autor, categoriaId);
        return await this.livroRepository.insertLivro(livro);
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);
        await this.livroRepository.updateLivro(livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);
        await this.livroRepository.deleteLivro(livro);
        return livro;
    }

    async filtrarLivroById(id: number): Promise<LivroEntity | null> {
        return await this.livroRepository.filterLivroById(id);
    }

    async filtrarLivroByTitulo(titulo: string): Promise<LivroEntity[] | null> {
        return await this.livroRepository.filterLivroByTitulo(titulo);
    }

    async listarTodosLivros(): Promise<LivroEntity[]> {
        return await this.livroRepository.filterAllLivro();
    }
}
