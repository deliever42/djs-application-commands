import { Permissions, type Snowflake, type RawApplicationCommandOptionChoiceData, type ApplicationCommandOptionChoiceData, type ApplicationCommandData, type RawApplicationCommandOptionData, type RawApplicationCommandData, ApplicationCommandTypes, type ApplicationCommandOptionData, ApplicationCommandOptionTypes, ChannelTypes } from "../index"
import type { Client } from "discord.js"

export class ApplicationCommand {
    public client: Client
    public id: string
    public name!: string;
    public guildId!: Snowflake | null;
    public applicationId!: Snowflake
    public permissions!: number
    public description!: string | null
    public descriptionLocalizations!: { [locale: string]: string }
    public nameLocalizations!: { [locale: string]: string }
    public global!: boolean
    public type!: keyof typeof ApplicationCommandTypes
    public version!: string
    public options!: ApplicationCommandOptionData[]
    public constructor(client: Client, data: RawApplicationCommandData) {
        this.id = data.id
        this.client = client

        this._patch(data)
    }

    private _patch(data: RawApplicationCommandData) {
        this.name = data.name
        this.guildId = data.guild_id ?? null
        this.applicationId = data.application_id
        this.permissions = data.default_member_permissions ? Number(data.default_member_permissions) : 0
        this.description = data.description ?? null
        this.descriptionLocalizations = data.description_localizations ?? {}
        this.nameLocalizations = data.name_localizations ?? {}
        this.global = data.dm_permission ?? false
        this.type = data.type ? ApplicationCommandTypes[data.type] as keyof typeof ApplicationCommandTypes : "SLASH_COMMAND"
        this.version = data.version
        this.options = data.options ? this.resolveCommandOptions(data.options, "mod") as ApplicationCommandOptionData[] : []
    }

    private resolveCommandOptionChoices(choices: ApplicationCommandOptionChoiceData[] | RawApplicationCommandOptionChoiceData[], to: "mod" | "raw") {
        switch (to) {
            case "mod":
                return (choices as RawApplicationCommandOptionChoiceData[]).map((choice) => {
                    return { name: choice.name, nameLocalizations: choice.name_localizations ?? null, value: choice.value }
                }) as unknown as RawApplicationCommandOptionChoiceData[]
                break
            case "raw":
                return (choices as ApplicationCommandOptionChoiceData[]).map((choice) => {
                    return { name: choice.name, name_localizations: choice.nameLocalizations ?? null, value: choice.value }
                }) as unknown as RawApplicationCommandOptionChoiceData[]
                break
        }
    }

    private resolveCommandOptions(options: RawApplicationCommandOptionData[] | ApplicationCommandOptionData[], to: "mod" | "raw"): ApplicationCommandOptionData[] {
        switch (to) {
            case "mod":
                return (options as RawApplicationCommandOptionData[]).map((option) => {
                    return {
                        name: option.name,
                        type: ApplicationCommandOptionTypes[option.type],
                        nameLocalizations: option.name_localizations ?? {},
                        description: option.description,
                        descriptionLocalizations: option.description_localizations ?? {},
                        required: option.required ?? false,
                        choices: this.resolveCommandOptionChoices(option.choices || [], "mod"),
                        options: option.options ? this.resolveCommandOptions(option.options, "mod") : [],
                        channelTypes: option.channel_types ? option.channel_types.map((type) => ChannelTypes[type]) as unknown as number[] : null,
                        minValue: option.min_value ?? null,
                        maxValue: option.max_value ?? null,
                        autocomplete: option.autocomplete ?? false
                    };
                }) as unknown as ApplicationCommandOptionData[]
                break
            case "raw":
                return (options as ApplicationCommandOptionData[]).map((option) => {
                    return {
                        name: option.name,
                        type: ApplicationCommandOptionTypes[option.type],
                        name_localizations: option.nameLocalizations ?? {},
                        description: option.description,
                        description_localizations: option.descriptionLocalizations ?? {},
                        required: option.required ?? false,
                        choices: this.resolveCommandOptionChoices(option.choices || [], "raw"),
                        options: option.options ? this.resolveCommandOptions(option.options, "mod") : [],
                        channel_types: option.channelTypes ? option.channelTypes.map((type) => ChannelTypes[type]) as unknown as number[] : null,
                        min_value: option.minValue ?? null,
                        max_value: option.maxValue ?? null,
                        autocomplete: option.autocomplete ?? false
                    };
                }) as unknown as ApplicationCommandOptionData[]
                break
        }
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

    private resolveCommand(command: ApplicationCommandData) {
        const type = ApplicationCommandTypes[command.type ?? "SLASH_COMMAND"];
        return {
            id: command.name ?? null,
            name: command.name ?? null,
            name_localizations: command.nameLocalizations ?? {},
            description: command.description ? type !== 1 ? null : command.description : null,
            description_localizations: command.descriptionLocalizations ?? {},
            type,
            options: command.options ? type !== 1 ? null : this.resolveCommandOptions(command.options, "raw") : null,
            default_member_permissions: command.permissions ? this.resolvePermissions(command.permissions) : "0",
            dm_permission: command.global ?? false,
            guild_id: command.guildId ?? null
        }
    }
}
