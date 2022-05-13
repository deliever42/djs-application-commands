import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("eval")
    .setDescription("Eval command for bot\'s owner")
    .setType("SLASH_COMMAND")
    .setGlobal(true)
    .addStringOption((builder) => {
        builder
            .setName("code")
            .setDescription("Code for test")
            .setRequired(true)
    })

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
