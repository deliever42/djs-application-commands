import type { ExtendedClient } from '../client';
import { readdirSync } from "fs"

export class CommandHandler {
    public constructor(client: ExtendedClient) {
        const files = readdirSync("./test/structures/commands").filter(file => file.endsWith(".js"))
      

            for (const file of files) {
                import(file).then((command) => {
                    
                    client.cache.commands.set(command.data.name,command)
                    
                })
                
            }

            client.on("interactionCreate", async (interaction) => {
                if (interaction.isApplicationCommand()) {
                    const command = client.cache.commands.get(interaction.commandName)

                    await interaction.deferReply({ ephemeral: true })

                    if (!command) {
                        await interaction.followUp({ content: ":x: | This command could not be found."})
                        return
                    }

                     command.run(client,interaction)
                }
            })
        
    }
}
