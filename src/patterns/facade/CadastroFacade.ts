import { PessoaService } from "../../service/PessoaService";
import { UsuarioService } from "../../service/UsuarioService";
import { UsuarioCompletoRequestDto } from "../../model/dto/UsuarioCompletoRequestDto";
import { BasicResponseDto } from "../../model/dto/BasicResponseDto";
import { RepositoryFactory } from "../factory/RepositoryFactory"; // Importar a fábrica

export class CadastroFacade {
    private pessoaService: PessoaService;
    private usuarioService: UsuarioService;

    constructor() {
        // Criamos a fábrica...
        const factory = new RepositoryFactory();
        // ...e a injetamos nos serviços, como fizemos nos controllers.
        this.pessoaService = new PessoaService(factory);
        this.usuarioService = new UsuarioService(factory);
    }

    public async cadastrarNovoUsuarioCompleto(dto: UsuarioCompletoRequestDto): Promise<BasicResponseDto> {
        console.log("[Facade] Iniciando processo de cadastro completo...");

        // Passo 1: Cadastrar a Pessoa
        const pessoaData = { name: dto.name, email: dto.email };
        const pessoa = await this.pessoaService.cadastrarPessoa(pessoaData);

        if (!pessoa || !pessoa.id) {
            throw new Error("Falha ao criar a pessoa.");
        }
        console.log(`[Facade] Pessoa criada com ID: ${pessoa.id}`);

        // Passo 2: Cadastrar o Usuário usando o ID da Pessoa
        const usuarioData = { idPessoa: pessoa.id, senha: dto.senha };
        const usuario = await this.usuarioService.cadastrarUsuario(usuarioData);
        console.log(`[Facade] Usuário criado com ID: ${usuario.id}`);

        const resultadoFinal = {
            pessoaId: pessoa.id,
            nome: pessoa.name,
            email: pessoa.email,
            usuarioId: usuario.id
        };
        
        return new BasicResponseDto("Usuário completo cadastrado com sucesso pela Facade!", resultadoFinal);
    }
}