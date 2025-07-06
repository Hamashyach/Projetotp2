import { PessoaService } from '../service/PessoaService';
import { IRepositoryFactory } from '../patterns/factory/IRepositoryFactory';
import { IPessoaRepository } from '../repository/interfaces/IPessoarepository';
import { PessoaEntity } from '../model/entity/PessoaEntity';

// 1. Mock do Repositório e da Fábrica
const mockPessoaRepository: IPessoaRepository = {
    insertPessoa: jest.fn(),
    updatePessoa: jest.fn(),
    deletarPessoa: jest.fn(),
    filterPessoaById: jest.fn(),
    filterPessoaByName: jest.fn(),
    filterAllPessoas: jest.fn(),
};

const mockRepositoryFactory: IRepositoryFactory = {
    createPessoaRepository: () => mockPessoaRepository,
    // As outras funções da fábrica podem ser mockadas se necessário
    createCategoriaRepository: jest.fn(),
    createEmprestimoRepository: jest.fn(),
    createLivroRepository: jest.fn(),
    createUsuarioRepository: jest.fn(),
};

// 2. Início dos Testes
describe('PessoaService', () => {
    let pessoaService: PessoaService;

    // Roda antes de cada teste no 'describe'
    beforeEach(() => {
        // Reseta os mocks para garantir que um teste não interfira no outro
        jest.clearAllMocks();
        // Cria uma nova instância do serviço com a fábrica mockada
        pessoaService = new PessoaService(mockRepositoryFactory);
    });

    it('deve cadastrar uma nova pessoa com sucesso', async () => {
        // Arrange (Preparação)
        const novaPessoa = { name: 'João Teste', email: 'joao@teste.com' };
        const pessoaCriada = new PessoaEntity(1, 'João Teste', 'joao@teste.com');
        
        // Configura o mock para retornar a pessoa criada quando insertPessoa for chamado
        (mockPessoaRepository.insertPessoa as jest.Mock).mockResolvedValue(pessoaCriada);

        // Act (Ação)
        const resultado = await pessoaService.cadastrarPessoa(novaPessoa);

        // Assert (Verificação)
        expect(resultado).toBeDefined();
        expect(resultado.id).toBe(1);
        expect(resultado.name).toBe('João Teste');
        // Verifica se o método do repositório foi chamado corretamente
        expect(mockPessoaRepository.insertPessoa).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma pessoa ao filtrar por ID', async () => {
        // Arrange
        const pessoaExistente = new PessoaEntity(5, 'Maria Silva', 'maria@email.com');
        (mockPessoaRepository.filterPessoaById as jest.Mock).mockResolvedValue(pessoaExistente);

        // Act
        const resultado = await pessoaService.filtrarPessoaById(5);

        // Assert
        expect(resultado).toEqual(pessoaExistente);
        expect(mockPessoaRepository.filterPessoaById).toHaveBeenCalledWith(5);
    });

    it('deve retornar nulo se a pessoa não for encontrada por ID', async () => {
        // Arrange
        (mockPessoaRepository.filterPessoaById as jest.Mock).mockResolvedValue(null);
        
        // Act
        const resultado = await pessoaService.filtrarPessoaById(99);

        // Assert
        expect(resultado).toBeNull();
        expect(mockPessoaRepository.filterPessoaById).toHaveBeenCalledWith(99);
    });
});