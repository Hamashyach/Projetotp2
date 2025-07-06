import { LivroService } from "../../service/LivroService";
import { LivroEntity } from "../../model/entity/LivroEntity";
import { ICommand } from "./ICommand";
import { LivroRequestDto } from "../../model/dto/LivroRequestDto";

export class AddLivroCommand implements ICommand {
    private livroService: LivroService;
    private livroData: LivroRequestDto;
    private livroCriado?: LivroEntity; // Armazenaremos o livro criado para poder desfazê-lo

    constructor(livroService: LivroService, livroData: LivroRequestDto) {
        this.livroService = livroService;
        this.livroData = livroData;
    }

    public async execute(): Promise<any> {
        console.log("[Command] Executando comando para adicionar livro...");
        this.livroCriado = await this.livroService.cadastrarLivro(this.livroData);
        console.log(`[Command] Livro criado com ID: ${this.livroCriado.id}`);
        return this.livroCriado;
    }

    public async undo(): Promise<any> {
        if (!this.livroCriado) {
            throw new Error("Nenhum livro foi criado para que a ação possa ser desfeita.");
        }

        console.log(`[Command] Desfazendo a criação do livro com ID: ${this.livroCriado.id}`);
        await this.livroService.deletarLivro(this.livroCriado);
        console.log("[Command] Ação de criação desfeita com sucesso.");
    }
}