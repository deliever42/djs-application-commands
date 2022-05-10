import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("global")
    .setDescription("Global Command")
    .setType("SLASH_COMMAND")
    .setGlobal(true)

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
