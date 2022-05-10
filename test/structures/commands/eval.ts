import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'eval',
    type: "SLASH_COMMAND",
    global: true,
    description: "Eval command for bot\'s owner",
    options: [
        {
            name: "code",
            description: "Code for test",
            type: "STRING",
            required: false,
            channelTypes: ["DM", "GUILD_TEXT"]
        }
    ]
};

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    if (interaction.user.id !== "931957993925378050") {
        await interaction.followUp({ content: "You are not my owner" });
        return
    }

    const code = interaction.options.getString("code") as string

    try {
        const result = await eval(code)

        await interaction.followUp({ content: `**SUCCESSFULLY**\n\n**${result.length > 2000 ? result.slice(2000) + " ..." : result}**` })
    } catch (e: any) {
        await interaction.followUp({ content: `**ERROR**\n\n**${e.length > 2000 ? e.slice(2000) + " ..." : e}**` })
    }
};
