import { EmprestimoEntity } from "../../model/entity/EmprestimoEntity";
import { IObserver } from "./IObserver";

export class LogObserver implements IObserver {
    update(data: EmprestimoEntity): void {
        console.log(`[Log Observer] Novo empréstimo registrado.`);
        console.log(`[Log Observer] DADOS: ${JSON.stringify(data, null, 2)}`);
    }
}