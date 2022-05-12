import { BaseOptionBuilder } from "./Base"
import { type RawApplicationCommandOptionData, StringOptionBuilder, AttachmentOptionBuilder, UserOptionBuilder, RoleOptionBuilder, NumberOptionBuilder, BooleanOptionBuilder, ChannelOptionBuilder, IntegerOptionBuilder, MentionableOptionBuilder } from "../../../index"

export class SubcommandOptionBuilder extends BaseOptionBuilder {
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        super("SUB_COMMAND")

        this.options = []
    }

    public addUserOption(fn: (builder: UserOptionBuilder) => void) {
        const builder = new UserOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addStringOption(fn: (builder: StringOptionBuilder) => void) {
        const builder = new StringOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addIntegerOption(fn: (builder: IntegerOptionBuilder) => void) {
        const builder = new IntegerOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addBooleanOption(fn: (builder: BooleanOptionBuilder) => void) {
        const builder = new BooleanOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addChannelOption(fn: (builder: ChannelOptionBuilder) => void) {
        const builder = new ChannelOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addRoleOption(fn: (builder: RoleOptionBuilder) => void) {
        const builder = new RoleOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addMentionableOption(fn: (builder: MentionableOptionBuilder) => void) {
        const builder = new MentionableOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addNumberOption(fn: (builder: NumberOptionBuilder) => void) {
        const builder = new NumberOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }

    public addAttachmentOption(fn: (builder: AttachmentOptionBuilder) => void) {
        const builder = new AttachmentOptionBuilder()

        fn(builder)

        this.options.push(builder.toJSON() as RawApplicationCommandOptionData)
        return this
    }
}