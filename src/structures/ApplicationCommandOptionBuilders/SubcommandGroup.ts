import { BaseOption } from "./Base"
import { SubcommandOptionBuilder } from "../../index"

export class SubcommandGroupOptionBuilder extends BaseOption {
    public options: SubcommandOptionBuilder[]
    public constructor() {
        super("SUB_COMMAND_GROUP")

        this.options = []
    }

    public addSubcommandOption(fn: (builder: SubcommandOptionBuilder) => SubcommandOptionBuilder) {
        this.options.push(fn(new SubcommandOptionBuilder()))
        return this
    }
}