import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";
import { RepositoryFactory } from "../patterns/factory/RepositoryFactory";
import { EmailObserver } from "../patterns/observer/EmailObserver"; // Importar
import { LogObserver } from "../patterns/observer/LogObserver"; // Importar

@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller {
    private emprestimoService = new EmprestimoService(new RepositoryFactory());

    constructor() {
        super();
        // Registrando os observers no serviço assim que o controller é criado
        this.emprestimoService.registerObserver(new EmailObserver());
        this.emprestimoService.registerObserver(new LogObserver());
    }

    @Post()
    async cadastrarEmprestimo(
        @Body() dto: EmprestimoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.cadastrarEmprestimo(dto);
            return success(201, new BasicResponseDto("Empréstimo criado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(dto);
            return success(200, new BasicResponseDto("Empréstimo atualizado com sucesso!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.deletarEmprestimo(dto);
            return success(200, new BasicResponseDto("Empréstimo deletado com sucesso!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarEmprestimoPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.filtrarEmprestimoById(id);
            if (emprestimo) {
                return success(200, new BasicResponseDto("Empréstimo encontrado!", emprestimo));
            } else {
                return notFound(400, new BasicResponseDto("Empréstimo não encontrado.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosEmprestimos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos = await this.emprestimoService.listarTodosEmprestimo();
            return success(200, new BasicResponseDto("Empréstimos listados com sucesso!", emprestimos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
