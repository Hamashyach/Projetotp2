import { ICommand } from "./ICommand";

export class CommandInvoker {
    private commandHistory: ICommand[] = [];

    public async executeCommand(command: ICommand): Promise<void> {
        await command.execute();
        this.commandHistory.push(command);
    }

    public async undoLastCommand(): Promise<void> {
        const lastCommand = this.commandHistory.pop();
        if (lastCommand) {
            await lastCommand.undo();
        } else {
            console.log("Nenhum comando para desfazer.");
        }
    }
}