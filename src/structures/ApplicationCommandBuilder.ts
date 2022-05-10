import { Permissions, type Snowflake, type RawApplicationCommandOptionData, ApplicationCommandTypes, StringOptionBuilder } from "../index"

export class ApplicationCommandBuilder {
    public name: string | null;
    public guild_id: Snowflake | null;
    public default_member_permissions: string
    public description: string | null
    public description_localizations: { [locale: string]: string }
    public name_localizations: { [locale: string]: string }
    public dm_permission: boolean
    public type: number | null
    public options: RawApplicationCommandOptionData[]
    public constructor() {
        this.name = null
        this.guild_id = null
        this.default_member_permissions = "0"
        this.description = null
        this.description_localizations = {}
        this.name_localizations = {}
        this.dm_permission = false
        this.type = 1
        this.options = []
    }

    public setName(name: string) {
        this.name = name
        return this
    }

    public setGuildId(guildId: Snowflake) {
        this.guild_id = guildId
        return this
    }

    public setPermissions(permissions: keyof typeof Permissions | (keyof typeof Permissions)[]) {
        this.default_member_permissions = this.resolvePermissions(permissions)
        return this
    }

    public setDescription(description: string) {
        this.description = description
        return this
    }

    public setDescriptionLocalizations(localizations: { [locale: string]: string }) {
        this.description_localizations = localizations;
        return this
    }

    public setNameLocalizations(localizations: { [locale: string]: string }) {
        this.name_localizations = localizations;
        return this
    }

    public setGlobal(global: boolean) {
        this.dm_permission = global
        return this
    }

    public setType(type: keyof typeof ApplicationCommandTypes) {
        this.type = ApplicationCommandTypes[type]
        return this
    }

    public addSubcommandOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addSubcommandGroupOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addStringOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addIntegerOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addBooleanOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addChannelOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addRoleOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addMentionableOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addNumberOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    public addAttachmentOption(fn: (StringBuilder: StringOptionBuilder) => StringOptionBuilder) {
        this.options.push(fn(new StringOptionBuilder()) as RawApplicationCommandOptionData)
        return this
    }

    private resolvePermissions(permissions: keyof typeof Permissions | (keyof typeof Permissions)[]) {
        let bit = 0 << 0;

        if (Array.isArray(permissions)) {
            for (const permission of permissions) {
                bit |= Permissions[permission] as unknown as number
            }

            return String(bit)
        }

        return String(bit |= Permissions[permissions] as unknown as number)
    }
}
