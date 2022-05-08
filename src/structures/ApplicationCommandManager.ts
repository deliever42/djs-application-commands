import type { Client } from "discord.js"
import  { type ApplicationCommandData, type ApplicationCommandOptionData, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes } from "../index"
import { REST } from "@discordjs/rest"
import  { PermissionFlagsBits } from 'discord-api-types';

export class ApplicationCommandManager {
    public client: Client
    public rest: REST
    public constructor(client: Client) {
        this.client = client
        this.rest = new REST({ version: "10" })

        this.rest.setToken(this.client.token as string)
    }

    public async push(commands: ApplicationCommandData[]) {
        const resolvedCommands = []

        for (const command of commands) {
            resolvedCommands.push(this.resolveCommand(command))
        }
    }

    public async delete(commandName: string, guildId?: string) {}

    public async edit(commandName: string, data: ApplicationCommandData, guildId?: string) {}

    public async fetch(commandName: string, guildId?: string) {}

    private resolveCommandOptions(options: ApplicationCommandOptionData[]):unknown[]{
        const resolved = []

        for (const option of options) {
            resolved.push({
                name: option.name,
                type: ApplicationCommandOptionTypes[option.type],
                name_localizations: option.nameLocalizations ?? {},
                description: option.description,
                description_localizations: option.descriptionLocalizations ?? {},
                required: option.required ?? false,
                choices: [],
                options: option.options ? this.resolveCommandOptions(option.options) : [],
                channel_types: [],
                min_value: option.minValue ?? null,
                max_value: option.maxValue ?? null,
                autocomplete: option.autocomplete ?? false
            })
        }
       

        return resolved
    }

    private resolvePermissions(permissions: keyof typeof PermissionFlagsBits | (keyof typeof PermissionFlagsBits)[]) {
        let bit = 0 << 0;

        if (Array.isArray(permissions)) {
            for (const permission of permissions) {
                bit |= PermissionFlagsBits[permission] as unknown as number
            }

            return String(bit)
        }

        return String(bit |= PermissionFlagsBits[permissions] as unknown as number)
    }

    private resolveCommand(command: ApplicationCommandData) {
        return {
            id: command.name,
            name: command.name,
            name_localizations: command.nameLocalizations ?? {},
            description: command.description ?? null,
            description_localizations: command.descriptionLocalizations ?? {},
            type: ApplicationCommandTypes[command.type ?? "SLASH_COMMAND"],
            options: command.options ? this.resolveCommandOptions(command.options) : null,
            default_member_permissions: command.permissions ? this.resolvePermissions(command.permissions) : null,
            dm_permission: command.global ?? false,
            guild_id: command.guildId ?? null
        }
    }
}
