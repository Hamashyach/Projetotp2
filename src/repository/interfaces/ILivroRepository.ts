import { LivroEntity } from "../../model/entity/LivroEntity";

export interface ILivroRepository {
    insertLivro(livro: LivroEntity): Promise<LivroEntity>;
    updateLivro(livro: LivroEntity): Promise<LivroEntity>;
    deleteLivro(livro: LivroEntity): Promise<LivroEntity>;
    filterLivroById(id: number): Promise<LivroEntity | null>;
    filterLivroByTitulo(titulo: string): Promise<LivroEntity[]>;
    filterAllLivro(): Promise<LivroEntity[]>;
}