import type { ExtendedClient } from '../client';
import { readdirSync } from "fs"
import { join } from "path"

export class CommandHandler {
    public constructor(client: ExtendedClient) {
        const files = readdirSync(join(__dirname, "..", "commands")).filter(file => file.endsWith(".js"))


        for (const file of files) {
            const command = require(join(__dirname, "..", "commands", file))

            client.cache.commands.set(command.data.name, command)

        }

        const globalCommands = [...client.cache.commands.values()].filter(command => command.data.global).map(command => command.data) as any[]
        const guildCommands = [...client.cache.commands.values()].filter(command => !command.data.global).map(command => command.data) as any[]

        client.applicationCommandManager.set(globalCommands)

        for (const guildId of client.guilds.cache.keys()) {
            client.applicationCommandManager.set(guildCommands, guildId)
        }

        client.on("guildCreate", async (guild) => {
            client.applicationCommandManager.set(guildCommands, guild.id)
        })

        client.on("interactionCreate", async (interaction) => {
            if (interaction.isApplicationCommand()) {
                const command = client.cache.commands.get(interaction.commandName)

                await interaction.deferReply({ ephemeral: true })

                if (!command) {
                    await interaction.followUp({ content: ":x: | This command could not be found." })
                    return
                }

                command.run(client, interaction)
            }
        })

    }
}
