import { IRepositoryFactory } from "../patterns/factory/IRepositoryFactory";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { ICategoriaRepository } from "../repository/interfaces/ICategoriaRepository";
import { CategoriaRequestDto } from "../model/dto/CategoriaRequestDto";
import { CategoriaDto } from "../model/dto/CategoriaDto";

export class CategoriaService {
    private categoriaRepository: ICategoriaRepository;

    constructor(factory: IRepositoryFactory) {
        this.categoriaRepository = factory.createCategoriaRepository();
    }

    async cadastrarCategoria(categoriaData: CategoriaRequestDto): Promise<CategoriaEntity> {
        const { name } = categoriaData;

        const categoriaExistente = await this.categoriaRepository.filterCategoriaByName(name);
        if (categoriaExistente && categoriaExistente.length > 0) {
            throw new Error(`A categoria "${name}" já existe.`);
        }

        const categoria = new CategoriaEntity(undefined, name);
        return await this.categoriaRepository.insertCategoria(categoria);
    }

    async atualizarCategoria(categoriaData: CategoriaDto): Promise<CategoriaEntity> {
        const { id, name } = categoriaData;

        const categoriaExistente = await this.categoriaRepository.filterCategoriaById(id);
        if (!categoriaExistente) {
            throw new Error(`Categoria com ID ${id} não existe.`);
        }

        const categoria = new CategoriaEntity(id, name);
        await this.categoriaRepository.updateCategoria(categoria);
        return categoria;
    }

    async deletarCategoria(id: number): Promise<void> {
        const categoriaExistente = await this.categoriaRepository.filterCategoriaById(id);
        if (!categoriaExistente) {
            throw new Error(`Categoria com ID ${id} não existe.`);
        }

        await this.categoriaRepository.deleteCategoria(categoriaExistente);
    }

    async filtrarCategoriaById(id: number): Promise<CategoriaEntity | null> {
        return await this.categoriaRepository.filterCategoriaById(id);
    }

    async filtrarCategoriaByName(name: string): Promise<CategoriaEntity[]> {
        return await this.categoriaRepository.filterCategoriaByName(name);
    }

    async listarTodasCategorias(): Promise<CategoriaEntity[]> {
        return await this.categoriaRepository.filterAllCategorias();
    }
}
