import { Body, Controller, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LoginRequestDto } from "../model/dto/LoginRequestDto";
import { LoginService } from "../service/LoginService";
import { LoginServiceProxy } from "../service/LoginServiceProxy";
import { ILoginService } from "../service/ILoginService";

@Route("login")
@Tags("Autenticação")
export class LoginController extends Controller {
    // Usamos o Proxy em vez do serviço real
    private loginService: ILoginService = new LoginServiceProxy(new LoginService());

    @Post()
    public async login(
        @Body() dto: LoginRequestDto,
        @Res() unauthorized: TsoaResponse<401, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.loginService.login(dto.idPessoa, dto.senha);

            if (usuario) {
                // Em um cenário real, aqui você geraria um token JWT
                return success(200, new BasicResponseDto("Login bem-sucedido!", { id: usuario.id, idPessoa: usuario.idPessoa }));
            } else {
                return unauthorized(401, new BasicResponseDto("ID da pessoa ou senha inválidos.", undefined));
            }
        } catch (error: any) {
            return unauthorized(401, new BasicResponseDto(error.message, undefined));
        }
    }
}