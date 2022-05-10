import { BaseOption } from "./Base"
import { SubcommandOptionBuilder } from "../../index"

export class SubcommandGroupOptionBuilder extends BaseOption {
    public options: SubcommandOptionBuilder[]
    public constructor() {
        super("SUB_COMMAND_GROUP")

        this.options = []
    }

    public addSubcommandOption(fn: (SubcommandBuilder: SubcommandOptionBuilder) => SubcommandOptionBuilder) {
        const option = fn(new SubcommandOptionBuilder())

        this.options.push(option)

        return this
    }
}