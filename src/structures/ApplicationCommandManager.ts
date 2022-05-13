import { type Client, CachedManager, type Collection } from "discord.js"
import { type RawApplicationCommandData, Permissions, type Snowflake, type RawApplicationCommandOptionChoiceData, type RawApplicationCommandOptionData, type ApplicationCommandOptionChoiceData, type ApplicationCommandEditData, ApplicationCommand, type ApplicationCommandData, type ApplicationCommandOptionData, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes } from "../index"
import { REST } from "@discordjs/rest"
import { Base } from "./Base"
import { ApplyMixins } from "./Utils/ApplyMixins"

declare module "discord.js" {
    interface CachedManager<K, Holds, R = null> {
        readonly cache: Collection<K, Holds>
    }
}

class ApplicationCommandManager extends CachedManager<Snowflake, ApplicationCommand> implements Base {
    public rest: REST
    public constructor(client: Client) {
        super(client, ApplicationCommand)

        this.rest = new REST({ version: "10" })
        this.rest.setToken(this.client.token as string);
    }

    public toJSON(): { [property: string]: any } {
        throw new Error("Method not implemented.")
    }

    public async set(commands: ApplicationCommandData[], guildId?: Snowflake) {
        const resolvedCommands: RawApplicationCommandData[] = []

        for (const command of commands) {
            if (!command.guildId && !command.global) command.guildId = guildId
            resolvedCommands.push(this.resolveCommand(command))
        }

        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands`

        const newCommands = await this.rest.put(route, {
            body: JSON.parse(JSON.stringify(resolvedCommands, (k, v) =>
                typeof v === 'bigint'
                    ? v.toString()
                    : v
            ))
        })

        for (const command of newCommands as any[]) {
            this.cache.set(command.id, new ApplicationCommand(this.client, command, this))
        }

        return this.cache
    }

    public async create(command: ApplicationCommandData, guildId?: Snowflake) {
        const resolvedCommand = this.resolveCommand(command)
        const route: `/${string}` = command.global ? `/applications/${this.client.application!.id}/commands` : `/applications/${this.client.application!.id}/guilds/${command.guildId ?? guildId}/commands`

        const data = await this.rest.post(route, {
            body: {
                ...resolvedCommand
            }
        })

        const applicationCommand = new ApplicationCommand(this.client, data as any, this)

        this.cache.set(applicationCommand.id, applicationCommand)

        return applicationCommand
    }

    public async delete(commandId: Snowflake, guildId?: Snowflake) {
        const command = this.cache.get(commandId)
        const route: `/${string}` = (command === undefined || !guildId ? true : command.global) ? `/applications/${this.client.application!.id}/commands/${commandId}` : `/applications/${this.client.application!.id}/guilds/${command?.guildId ?? guildId}/commands/${commandId}`

        await this.rest.delete(route)

        this.cache.delete(commandId)
        return
    }

    public async edit(commandId: Snowflake, data: ApplicationCommandEditData, guildId?: Snowflake) {
        const command = this.cache.get(commandId)
        const route: `/${string}` = (command === undefined || !guildId ? true : command.global) ? `/applications/${this.client.application!.id}/commands/${commandId}` : `/applications/${this.client.application!.id}/guilds/${command?.guildId ?? guildId}/commands/${commandId}`

        if (!data.name) data.name = command?.name
        if (!data.description && command?.description) data.description = command.description
        if (!data.type) data.type = command?.type

        const resolvedData = this.resolveCommand(data as any)
        const newData = await this.rest.patch(route, { body: { ...resolvedData } })
        const applicationCommand = new ApplicationCommand(this.client, newData as any, this)

        this.cache.set(applicationCommand.id, applicationCommand)

        return applicationCommand
    }

    public async fetch(commandId?: string, guildId?: Snowflake) {
        if (commandId) {
            const command = this.cache.get(commandId)
            const route: `/${string}` = (command === undefined || !guildId ? true : command.global) ? `/applications/${this.client.application!.id}/commands/${commandId}` : `/applications/${this.client.application!.id}/guilds/${command?.guildId ?? guildId}/commands/${commandId}`

            const newData = await this.rest.get(route) as ApplicationCommandData

            return new ApplicationCommand(this.client, newData as any, this)

        } else {
            const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands`
            const commands = await this.rest.get(route) as ApplicationCommandData[]
            const resolvedCommands = []

            this.cache.clear()
            for (const command of commands) {
                const applicationCommand = new ApplicationCommand(this.client, command as any, this)
                resolvedCommands.push(applicationCommand)
                this.cache.set(applicationCommand.id, applicationCommand)
            }

            return this.cache
        }
    }

    public async setName(commandId: Snowflake, name: string, guildId?: Snowflake) {
        return await this.edit(commandId, { name }, guildId)
    }

    public async setNameLocalizations(commandId: Snowflake, localizations: { [locale: string]: string }, guildId?: Snowflake) {
        return await this.edit(commandId, {
            nameLocalizations: localizations
        }, guildId)
    }

    public async setDescription(commandId: Snowflake, description: string, guildId?: Snowflake) {
        return await this.edit(commandId, { description }, guildId)
    }

    public async setDescriptionLocalizations(commandId: Snowflake, localizations: { [locale: string]: string }, guildId?: Snowflake) {
        return await this.edit(commandId, {
            descriptionLocalizations: localizations
        }, guildId)
    }

    public async setOptions(commandId: Snowflake, options: ApplicationCommandOptionData[], guildId?: Snowflake) {
        return await this.edit(commandId, { options }, guildId)
    }

    public async setPermissions(commandId: Snowflake, permissions: keyof typeof Permissions | (keyof typeof Permissions)[], guildId?: Snowflake) {
        return await this.edit(commandId, { permissions }, guildId)
    }

    public async setGlobal(commandId: Snowflake, global: boolean, guildId?: Snowflake) {
        return await this.edit(commandId, { global }, guildId)
    }

    private resolveCommandOptionChoices(choices: ApplicationCommandOptionChoiceData[]): RawApplicationCommandOptionChoiceData[] {
        return choices.map((choice) => {
            return { name: choice.name, name_localizations: choice.nameLocalizations ?? null, value: choice.value }
        }) as unknown as RawApplicationCommandOptionChoiceData[]
    }

    private resolveCommandOptions(options: ApplicationCommandOptionData[]): RawApplicationCommandOptionData[] {
        return options.map((option) => {
            return {
                name: option.name,
                type: typeof option.type === "string" ? ApplicationCommandOptionTypes[option.type] : option.type,
                name_localizations: option.nameLocalizations ?? {},
                description: option.description,
                description_localizations: option.descriptionLocalizations ?? {},
                required: option.required ?? false,
                choices: this.resolveCommandOptionChoices(option.choices ?? []),
                options: option.options ? this.resolveCommandOptions(option.options) : [],
                channel_types: option.channelTypes ? option.channelTypes.map((type) => ChannelTypes[type]) as number[] : null,
                min_value: option.minValue ?? null,
                max_value: option.maxValue ?? null,
                autocomplete: option.autocomplete ?? false
            }
        }) as unknown as RawApplicationCommandOptionData[]
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

    private resolveCommand(command: ApplicationCommandData): RawApplicationCommandData {
        const type = typeof command.type === "string" ? ApplicationCommandTypes[command.type ?? "SLASH_COMMAND"] : command.type ?? 1
        return {
            name: command.name,
            name_localizations: command.nameLocalizations ?? {},
            description: command.description ? command.description : null,
            description_localizations: command.descriptionLocalizations ?? {},
            type,
            options: command.options ? type !== 1 ? [] : this.resolveCommandOptions(command.options) : [],
            default_member_permissions: command.permissions ? this.resolvePermissions(command.permissions) : "0",
            dm_permission: command.guildId ? false : command.global ?? false,
            guild_id: command.global ? null : command.guildId ?? null
        } as any as RawApplicationCommandData
    }
}

ApplyMixins(ApplicationCommandManager, [Base])

export { ApplicationCommandManager }