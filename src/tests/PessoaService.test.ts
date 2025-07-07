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
    findPessoaByEmail: jest.fn(), // Método que estava faltando no mock
    filterAllPessoas: jest.fn(),
};

const mockRepositoryFactory: IRepositoryFactory = {
    createPessoaRepository: () => mockPessoaRepository,
    createCategoriaRepository: jest.fn(),
    createEmprestimoRepository: jest.fn(),
    createLivroRepository: jest.fn(),
    createUsuarioRepository: jest.fn(),
};

// 2. Início dos Testes
describe('PessoaService', () => {
    let pessoaService: PessoaService;

    beforeEach(() => {
        jest.clearAllMocks();
        pessoaService = new PessoaService(mockRepositoryFactory);
    });

    it('deve cadastrar uma nova pessoa com sucesso', async () => {
        // Arrange
        const novaPessoa = { name: 'João Teste', email: 'joao@teste.com' };
        const pessoaCriada = new PessoaEntity(1, 'João Teste', 'joao@teste.com');
        
        (mockPessoaRepository.findPessoaByEmail as jest.Mock).mockResolvedValue(null);
        (mockPessoaRepository.insertPessoa as jest.Mock).mockResolvedValue(pessoaCriada);

        // Act
        const resultado = await pessoaService.cadastrarPessoa(novaPessoa);

        // Assert
        expect(resultado).toBeDefined();
        expect(resultado.id).toBe(1);
        expect(resultado.name).toBe('João Teste');
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

    it('deve lançar um erro ao tentar cadastrar um e-mail que já existe', async () => {
        // Arrange
        const pessoaExistente = { name: 'João Teste', email: 'joao@teste.com' };
        
        (mockPessoaRepository.findPessoaByEmail as jest.Mock).mockResolvedValue(new PessoaEntity(1, 'João Antigo', 'joao@teste.com'));

        // Act & Assert
        await expect(pessoaService.cadastrarPessoa(pessoaExistente))
            .rejects
            .toThrow("O e-mail 'joao@teste.com' já está em uso.");

        expect(mockPessoaRepository.insertPessoa).not.toHaveBeenCalled();
    });
});