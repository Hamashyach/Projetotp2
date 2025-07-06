import express from "express";
import path from "path"; // Garanta que o 'path' está importado
import { RegisterRoutes } from "./route/routes";
import { setupSwagger } from "./config/swagger";


const app = express();
const PORT = 3040;

app.use(express.json());

// 1. SERVIR ARQUIVOS ESTÁTICOS (HTML, CSS, JS do Frontend)
// Esta linha DEVE vir ANTES da configuração das rotas da API.
app.use(express.static(path.join(__dirname, '../../public')));

// 2. CONFIGURAR AS ROTAS DA API
const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter); // Todas as rotas da API começarão com /api

// 3. CONFIGURAR O SWAGGER
setupSwagger(app);

// 4. INICIAR O SERVIDOR
app.listen(PORT, ()=> console.log(`API online na porta: ${PORT}. Acesse o frontend em http://localhost:${PORT}/index.html`));