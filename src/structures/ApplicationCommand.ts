import { type ApplicationCommandEditData, Permissions, type Snowflake, type RawApplicationCommandOptionChoiceData, type ApplicationCommandOptionChoiceData, type ApplicationCommandData, type RawApplicationCommandOptionData, type RawApplicationCommandData, ApplicationCommandTypes, type ApplicationCommandOptionData, ApplicationCommandOptionTypes, ChannelTypes, ApplicationCommandManager } from "../index"
import type { Client } from "discord.js"
import { DiscordSnowflake } from "@sapphire/snowflake";

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
        this.options = data.options ? this.resolveCommandOptions(data.options) as ApplicationCommandOptionData[] : []
    }

    public get createdTimestamp() {
        return DiscordSnowflake.timestampFrom(this.id)
    }

    public get createdAt() {
        return new Date(this.createdTimestamp)
    }

    public get guild() {
        return this.guildId ? this.client.guilds.cache.get(this.guildId) : null
    }

    public async fetchGuild() {
        return this.guildId ? await this.client.guilds.fetch(this.guildId) : null
    }

    public async delete() {
        await this.manager.delete(this.id, this.guildId as string)

        return
    }

    public async edit(data: ApplicationCommandEditData) {
        const command = await this.manager.edit(this.id, data, this.guildId as string)

        return command
    }

    public async fetch() {
        const command = await this.manager.fetch(this.id, this.guildId as string) as ApplicationCommand

        return command
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

    private resolveCommandOptionChoices(choices: RawApplicationCommandOptionChoiceData[]) {
        return (choices as RawApplicationCommandOptionChoiceData[]).map((choice) => {
            return { name: choice.name, nameLocalizations: choice.name_localizations ?? null, value: choice.value }
        }) as unknown as RawApplicationCommandOptionChoiceData[]
    }

    private resolveCommandOptions(options: RawApplicationCommandOptionData[]): ApplicationCommandOptionData[] {
        return (options as RawApplicationCommandOptionData[]).map((option) => {
            return {
                name: option.name,
                type: typeof option.type === "string" ? ApplicationCommandOptionTypes[option.type] : option.type,
                nameLocalizations: option.name_localizations ?? {},
                description: option.description,
                descriptionLocalizations: option.description_localizations ?? {},
                required: option.required ?? false,
                choices: this.resolveCommandOptionChoices(option.choices || []),
                options: option.options ? this.resolveCommandOptions(option.options) : [],
                channelTypes: option.channel_types ? option.channel_types.map((type) => ChannelTypes[type]) as unknown as number[] : null,
                minValue: option.min_value ?? null,
                maxValue: option.max_value ?? null,
                autocomplete: option.autocomplete ?? false
            };
        }) as unknown as ApplicationCommandOptionData[]
    }
}
