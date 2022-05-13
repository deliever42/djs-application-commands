import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("ping")
    .setType("SLASH_COMMAND")
    .setGlobal(true)
    .setDescription("Get the bot\'s ping")

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: `My ping is :ping_pong: **${client.ws.ping}**ms` });
};
