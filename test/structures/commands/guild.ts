import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'guild',
    description: 'Guild Command',
    global: false,
    type: "SLASH_COMMAND"
};

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
