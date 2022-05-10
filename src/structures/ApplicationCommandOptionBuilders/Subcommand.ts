import { BaseOption } from "./Base"
import { type RawApplicationCommandOptionData, StringOptionBuilder, AttachmentOptionBuilder, UserOptionBuilder, RoleOptionBuilder, NumberOptionBuilder, BooleanOptionBuilder, ChannelOptionBuilder, IntegerOptionBuilder, MentionableOptionBuilder } from "../../index"

export class SubcommandOptionBuilder extends BaseOption {
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        super("SUB_COMMAND")

        this.options = []
    }

    public addUserOption(fn: (builder: UserOptionBuilder) => UserOptionBuilder) {
        this.options.push(fn(new UserOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addStringOption(fn: (builder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addIntegerOption(fn: (builder: IntegerOptionBuilder) => IntegerOptionBuilder) {
        this.options.push(fn(new IntegerOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addBooleanOption(fn: (builder: BooleanOptionBuilder) => BooleanOptionBuilder) {
        this.options.push(fn(new BooleanOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addChannelOption(fn: (builder: ChannelOptionBuilder) => ChannelOptionBuilder) {
        this.options.push(fn(new ChannelOptionBuilder()) as unknown as RawApplicationCommandOptionData)
        return this
    }

    public addRoleOption(fn: (builder: RoleOptionBuilder) => RoleOptionBuilder) {
        this.options.push(fn(new RoleOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addMentionableOption(fn: (builder: MentionableOptionBuilder) => MentionableOptionBuilder) {
        this.options.push(fn(new MentionableOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addNumberOption(fn: (builder: NumberOptionBuilder) => NumberOptionBuilder) {
        this.options.push(fn(new NumberOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addAttachmentOption(fn: (builder: AttachmentOptionBuilder) => AttachmentOptionBuilder) {
        this.options.push(fn(new AttachmentOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }
}