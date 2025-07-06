import { LivroService } from "../service/LivroService";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDto } from "../model/dto/LivroDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { RepositoryFactory } from "../patterns/factory/RepositoryFactory";
import { CommandInvoker } from "../patterns/command/CommandInvoker";
import { AddLivroCommand } from "../patterns/command/AddLivroCommand";

// --- Instanciar o Invocador globalmente (ou por instância do controller) ---
const commandInvoker = new CommandInvoker();

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller {
    // Instancia a fábrica
    private repositoryFactory = new RepositoryFactory();
    // Passa a fábrica para o serviço
    private livroService = new LivroService(this.repositoryFactory);

    // Modificar o método de cadastro para usar o Padrão Command
    @Post()
    async cadastrarLivro(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const addCommand = new AddLivroCommand(this.livroService, dto);
            await commandInvoker.executeCommand(addCommand);
            
            const livroCriado = (addCommand as any).livroCriado;
            return success(201, new BasicResponseDto("Livro criado com sucesso via Command!", livroCriado));

        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    // --- Nova Rota para Desfazer ---
    @Post("/undo")
    async undoLastLivroAction(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await commandInvoker.undoLastCommand();
            return success(200, new BasicResponseDto("Última ação desfeita com sucesso!", undefined));
        } catch(error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    // ... (restante dos métodos do controller: atualizarLivro, deletarLivro, etc. permanecem os mesmos)
    // ...
    @Put()
    async atualizarLivro(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.atualizarLivro(dto);
            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarLivro(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.deletarLivro(dto);
            return success(200, new BasicResponseDto("Livro deletado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarLivroById(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.filtrarLivroById(id);
            if (livro) {
                return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livro));
            } else {
                return notFound(400, new BasicResponseDto("Livro não encontrado.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("titulo/{titulo}")
    async filtrarLivroByTitulo(
        @Path() titulo: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.filtrarLivroByTitulo(titulo);
            if (livro) {
                return success(200, new BasicResponseDto("Livros encontrados com sucesso!", livro));
            } else {
                return notFound(400, new BasicResponseDto("Nenhum livro encontrado com o título fornecido.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosLivros(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros = await this.livroService.listarTodosLivros();
            return success(200, new BasicResponseDto("Livros listados com sucesso!", livros));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}