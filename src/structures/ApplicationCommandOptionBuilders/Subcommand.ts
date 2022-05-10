import { BaseOption } from "./Base"
import { type RawApplicationCommandOptionData, StringOptionBuilder } from "../../index"

export class SubcommandOptionBuilder extends BaseOption {
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        super("SUB_COMMAND")

        this.options = []
    }

    public addStringOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addIntegerOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addBooleanOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addChannelOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addRoleOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addMentionableOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addNumberOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }

    public addAttachmentOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        const option = fn(new StringOptionBuilder())

        this.options.push(option as RawApplicationCommandOptionData)
        return this
    }
}