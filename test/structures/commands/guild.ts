import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("guild")
    .setDescription("Guild Command")
    .setType("SLASH_COMMAND")

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
