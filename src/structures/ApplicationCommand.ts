import { type ApplicationCommandEditData, Permissions, type Snowflake, type RawApplicationCommandOptionChoiceData, type ApplicationCommandOptionChoiceData, type ApplicationCommandData, type RawApplicationCommandOptionData, type RawApplicationCommandData, ApplicationCommandTypes, type ApplicationCommandOptionData, ApplicationCommandOptionTypes, ChannelTypes, ApplicationCommandManager } from "../index"
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
    public manager: ApplicationCommandManager
    public constructor(client: Client, data: RawApplicationCommandData, manager: ApplicationCommandManager) {
        this.id = data.id
        this.client = client
        this.manager = manager

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

    public async delete() {
        const route: `/${string}` = !this.guildId ? `/applications/${this.client.application!.id}/commands/${this.name}` : `/applications/${this.client.application!.id}/guilds/${this.guildId}/commands/${this.name}`

        await this.manager.rest.delete(route)

        this.manager.cache.delete(this.name)

        return
    }

    public async edit(data: ApplicationCommandEditData) {
        const route: `/${string}` = !this.guildId ? `/applications/${this.client.application!.id}/commands/${this.name}` : `/applications/${this.client.application!.id}/guilds/${this.guildId}/commands/${this.name}`
        const resolvedData = this.resolveCommand(data as any)
        const command = await this.manager.rest.patch(route, { body: { ...resolvedData } })

        this._patch(command as any)

        this.manager.cache.set(this.name, this)

        return this
    }

    public async fetch() {
        const route: `/${string}` = !this.guildId ? `/applications/${this.client.application!.id}/commands/${this.name}` : `/applications/${this.client.application!.id}/guilds/${this.guildId}/commands/${this.name}`
        const resolvedData = this.resolveCommand(this as any)
        const command = await this.manager.rest.get(route, { body: { ...resolvedData } })

        this._patch(command as any)

        this.manager.cache.set(this.name, this)

        return this
    }

    public async setName(newName: string) {
        return await this.edit({ name: newName })
    }

    public async setNameLocalizations(localizations: { [locale: string]: string }) {
        return await this.edit({
            nameLocalizations: localizations
        })
    }

    public async setDescription(description: string) {
        return await this.edit({ description })
    }

    public async setDescriptionLocalizations(localizations: { [locale: string]: string }) {
        return await this.edit({
            descriptionLocalizations: localizations
        })
    }

    public async setOptions(options: ApplicationCommandOptionData[]) {
        return await this.edit({ options })
    }

    public async setPermissions(permissions: keyof typeof Permissions | (keyof typeof Permissions)[]) {
        return await this.edit({ permissions })
    }

    public async setGlobal(global: boolean) {
        return await this.edit({ global })
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
            options: command.options ? type !== 1 ? null : this.resolveCommandOptions(command.options, "raw") : [],
            default_member_permissions: command.permissions ? this.resolvePermissions(command.permissions) : "0",
            dm_permission: command.global ?? false,
            guild_id: command.guildId ?? null
        }
    }
}
