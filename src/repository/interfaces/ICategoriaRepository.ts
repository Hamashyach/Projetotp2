import { CategoriaEntity } from "../../model/entity/CategoriaEntity";

export interface ICategoriaRepository {
    insertCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity>;
    updateCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity>;
    deleteCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity>;
    filterCategoriaById(id: number): Promise<CategoriaEntity | null>;
    filterCategoriaByName(name: string): Promise<CategoriaEntity[]>;
    filterAllCategorias(): Promise<CategoriaEntity[]>;
}