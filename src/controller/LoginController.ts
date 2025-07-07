import { Body, Controller, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LoginRequestDto } from "../model/dto/LoginRequestDto";
import { LoginService } from "../service/LoginService";
import { LoginServiceProxy } from "../service/LoginServiceProxy";
import { ILoginService } from "../service/ILoginService";

@Route("login")
@Tags("Autenticação")
export class LoginController extends Controller {
    private loginService: ILoginService = new LoginServiceProxy(new LoginService());

    @Post()
    public async login(
        @Body() dto: LoginRequestDto, // O DTO já foi atualizado
        @Res() unauthorized: TsoaResponse<401, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            // Passa email e senha para o serviço
            const usuario = await this.loginService.login(dto.email, dto.senha);

            if (usuario) {
                return success(200, new BasicResponseDto("Login bem-sucedido!", { id: usuario.id, idPessoa: usuario.idPessoa }));
            } else {
                return unauthorized(401, new BasicResponseDto("E-mail ou senha inválidos.", undefined));
            }
        } catch (error: any) {
            return unauthorized(401, new BasicResponseDto(error.message, undefined));
        }
    }
}