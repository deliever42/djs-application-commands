import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'ping',
    type: "SLASH_COMMAND",
    global: true,
    description: "Get the bot\'s ping"
};

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: `My ping is :ping_pong: **${client.ws.ping}**ms` });
};
