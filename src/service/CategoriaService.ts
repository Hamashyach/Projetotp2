import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService{

    categoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { name } = categoriaData;
        
        const categoria = new CategoriaEntity(undefined, name)

        const novaCategoria =  await this.categoriaRepository.insertCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, name} = categoriaData;

        const categoria = new CategoriaEntity(id, name)

        await this.categoriaRepository.updateCategoria(categoria);
        console.log("Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, name} = categoriaData;

        const categoria = new CategoriaEntity(id, name)

        await this.categoriaRepository.deleteCategoria(categoria);
        console.log("Service - Delete ", categoria);
        return categoria;
    }

    async filtrarCategoriaById(categoriaData: any): Promise<CategoriaEntity> {
        const idNumber = parseInt(categoriaData, 10);

        const categoria =  await this.categoriaRepository.filterCategoriaById(idNumber);
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async filtrarCategoriaByName(categoriaData: any): Promise<CategoriaEntity[]> {
        const name:string = categoriaData;

        const categoria =  await this.categoriaRepository.filterCategoriaByName(name);
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async listarTodasCategorias(): Promise<CategoriaEntity[]> {
        const categoria =  await this.categoriaRepository.filterAllCategorias();
        console.log("Service - Filtrar Todos", categoria);
        return categoria;
    }

}