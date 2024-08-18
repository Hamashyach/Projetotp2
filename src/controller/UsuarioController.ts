import { UsuarioService } from "../service/UsuarioService";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {
    usuarioService = new UsuarioService();

    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return sucess(201, new BasicResponseDto("Usuario criado com sucesso!", usuario));
        } catch(error:any){
            const mensagemErro = error.message || 'Erro ao cadastrar usuário.';
            return fail(400, new BasicResponseDto(mensagemErro, undefined));
        }
    }

    @Put()
    async atualizarUsuario(
        @Body() dto: UsuarioDto, 
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto);
            return success(200, new BasicResponseDto("Usuario atualizado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.deletarusuario(dto);
            return success(200, new BasicResponseDto("usuario deletado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarUsuarioPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.filtrarUsuarioById(id);
            return success(200, new BasicResponseDto("Usuario encontrado!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosUsuarios(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario: UsuarioEntity[] = await this.usuarioService.listarTodosUsuarios();
            return success(200, new BasicResponseDto("Usuarios listados com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
