import { type Client, CachedManager, type Collection } from "discord.js"
import { Permissions, type Snowflake, type RawApplicationCommandOptionChoiceData, type RawApplicationCommandOptionData, type ApplicationCommandOptionChoiceData, type ApplicationCommandEditData, ApplicationCommand, type ApplicationCommandData, type ApplicationCommandOptionData, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes } from "../index"
import { REST } from "@discordjs/rest"

declare module "discord.js" {
    interface CachedManager<K, Holds, R> {
        readonly cache: Collection<K, Holds>
    }
}

export class ApplicationCommandManager extends CachedManager<string, ApplicationCommand, ApplicationCommand> {
    public rest: REST
    public constructor(client: Client) {
        super(client, ApplicationCommand)

        this.rest = new REST({ version: "10" })
        this.rest.setToken(this.client.token as string);
    }

    public async set(commands: ApplicationCommandData[], guildId?: Snowflake) {
        const resolvedCommands = []

        for (const command of commands) {
            if (!command.guildId && !command.global) command.guildId = guildId
            resolvedCommands.push(this.resolveCommand(command))
        }

        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands`

        await this.rest.put(route, {
            body: {
                commands: resolvedCommands
            }
        })

        for (const command of resolvedCommands) {
            this.cache.set(command.name, command as any)
        }

        return this.cache
    }

    public async create(command: ApplicationCommandData, guildId?: Snowflake) {
        const resolvedCommand = this.resolveCommand(command)

        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands`


        const data = await this.rest.post(route, {
            body: {
                ...resolvedCommand
            }
        })

        const applicationCommand = new ApplicationCommand(this.client, data as any)

        this.cache.set(applicationCommand.name, applicationCommand)

        return applicationCommand
    }

    public async delete(commandName: string, guildId?: Snowflake) {
        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands/${commandName}` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands/${commandName}`


        await this.rest.delete(route)

        this.cache.delete(commandName)
        return
    }

    public async edit(commandName: string, data: ApplicationCommandEditData, guildId?: Snowflake) {
        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands/${commandName}` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands/${commandName}`
        const resolvedData = this.resolveCommand(data as any)
        const command = await this.rest.patch(route, { body: { ...resolvedData } })
        const applicationCommand = new ApplicationCommand(this.client, command as any)

        this.cache.set(applicationCommand.name, applicationCommand)

        return applicationCommand
    }

    public async fetch(commandName?: string, guildId?: Snowflake) {
        const route: `/${string}` = !guildId ? `/applications/${this.client.application!.id}/commands/${commandName}` : `/applications/${this.client.application!.id}/guilds/${guildId}/commands/${commandName}`


        if (commandName) {
            const command = await this.rest.get(route) as ApplicationCommandData

            return new ApplicationCommand(this.client, command as any)

        } else {
            const commands = await this.rest.get(route) as ApplicationCommandData[]
            const resolvedCommands = []

            this.cache.clear()
            for (const command of commands) {
                const applicationCommand = new ApplicationCommand(this.client, command as any)
                resolvedCommands.push(applicationCommand)
                this.cache.set(applicationCommand.name, applicationCommand)
            }

            return this.cache
        }
    }

    public async setName(commandName: string, newName: string, guildId?: Snowflake) {
        return await this.edit(commandName, { name: newName }, guildId)
    }

    public async setNameLocalizations(commandName: string, localizations: { [locale: string]: string }, guildId?: Snowflake) {
        return await this.edit(commandName, {
            nameLocalizations: localizations
        }, guildId)
    }

    public async setDescription(commandName: string, description: string, guildId?: Snowflake) {
        return await this.edit(commandName, { description }, guildId)
    }

    public async setDescriptionLocalizations(commandName: string, localizations: { [locale: string]: string }, guildId?: Snowflake) {
        return await this.edit(commandName, {
            descriptionLocalizations: localizations
        }, guildId)
    }

    public async setOptions(commandName: string, options: ApplicationCommandOptionData[], guildId?: Snowflake) {
        return await this.edit(commandName, { options }, guildId)
    }

    public async setPermissions(commandName: string, permissions: keyof typeof Permissions | (keyof typeof Permissions)[], guildId?: Snowflake) {
        return await this.edit(commandName, { permissions }, guildId)
    }

    public async setGlobal(commandName: string, global: boolean, guildId?: Snowflake) {
        return await this.edit(commandName, { global }, guildId)
    }

    private resolveCommandOptionChoices(choices: ApplicationCommandOptionChoiceData[]) {
        return choices.map((choice) => {
            return { name: choice.name, name_localizations: choice.nameLocalizations ?? null, value: choice.value }
        }) as unknown as RawApplicationCommandOptionChoiceData[]
    }

    private resolveCommandOptions(options: ApplicationCommandOptionData[]): RawApplicationCommandOptionData[] {
        return options.map((option) => {
            return {
                name: option.name,
                type: ApplicationCommandOptionTypes[option.type],
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

    private resolveCommand(command: ApplicationCommandData) {
        const type = ApplicationCommandTypes[command.type ?? "SLASH_COMMAND"];
        return {
            id: command.name ?? null,
            name: command.name ?? null,
            name_localizations: command.nameLocalizations ?? {},
            description: command.description ? type !== 1 ? null : command.description : null,
            description_localizations: command.descriptionLocalizations ?? {},
            type,
            options: command.options ? type !== 1 ? null : this.resolveCommandOptions(command.options) : [],
            default_member_permissions: command.permissions ? this.resolvePermissions(command.permissions) : "0",
            dm_permission: command.global ?? false,
            guild_id: command.guildId ?? null
        }
    }
}
