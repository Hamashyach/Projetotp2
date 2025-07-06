import { EmprestimoEntity } from "../../model/entity/EmprestimoEntity";
import { IObserver } from "./IObserver";

export class EmailObserver implements IObserver {
    update(data: EmprestimoEntity): void {
        console.log(`[Email Observer] Simulação de envio de e-mail para o usuário ID ${data.usuarioId}.`);
        console.log(`[Email Observer] Detalhes: Livro ID ${data.livroId} emprestado até ${data.dataDevolucao.toLocaleDateString()}.`);
    }
}