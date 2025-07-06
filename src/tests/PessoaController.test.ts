import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '../route/routes';
import { closeMysqlConnection } from '../database/mysql';

// --- SETUP DO SERVIDOR DE TESTE ---
const app = express();
app.use(express.json());

// Importante: Usamos o router da nossa aplicação real
const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);

// --- TESTES DE INTEGRAÇÃO ---
describe('PessoaController - Testes de Integração', () => {

    afterAll(async () => {
        await closeMysqlConnection();
    });

    it('POST /api/pessoa - Deve criar uma nova pessoa e retornar 201', async () => {
        // Arrange
        const novaPessoa = {
            name: `Pessoa Supertest ${Date.now()}`,
            email: `supertest${Date.now()}@email.com`,
        };

        // Act & Assert
        const response = await request(app)
            .post('/api/pessoa')
            .send(novaPessoa);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Pessoa criada com sucesso!');
        expect(response.body.object.id).toBeDefined();
        expect(response.body.object.name).toBe(novaPessoa.name);
    });

    it('GET /api/pessoa/all - Deve retornar uma lista de pessoas e status 200', async () => {
        // Act
        const response = await request(app).get('/api/pessoa/all');

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Pessoas listadas com sucesso!');
        // Verifica se o resultado é um array
        expect(Array.isArray(response.body.object)).toBe(true);
    });

});