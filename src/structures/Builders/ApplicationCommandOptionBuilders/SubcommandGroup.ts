import { BaseOptionBuilder } from "./Base"
import { SubcommandOptionBuilder, type RawApplicationCommandOptionData } from "../../../index"

export class SubcommandGroupOptionBuilder extends BaseOptionBuilder {
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        super("SUB_COMMAND_GROUP")

        this.options = []
    }

    public addSubcommandOption(fn: (builder: SubcommandOptionBuilder) => void) {
        const builder = new SubcommandOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }
}