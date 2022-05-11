import { BaseOption } from "./Base"
import { SubcommandOptionBuilder, type RawApplicationCommandOptionData } from "../../index"

export class SubcommandGroupOptionBuilder extends BaseOption {
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        super("SUB_COMMAND_GROUP")

        this.options = []
    }

    public addSubcommandOption(fn: (builder: SubcommandOptionBuilder) => SubcommandOptionBuilder) {
        this.options.push(fn(new SubcommandOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }
}