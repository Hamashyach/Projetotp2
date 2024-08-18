export class CategoriaRequestDto{
    name: string;

    constructor(name?: string){
        this.name = name || '';
    }
}