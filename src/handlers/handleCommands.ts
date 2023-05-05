import { CommandType } from "../lib/typeCommand";

export class CommandDefinition {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}
