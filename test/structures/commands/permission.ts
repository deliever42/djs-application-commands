import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'permission',
    description: 'Permission Command',
    global: true,
    type: "SLASH_COMMAND",
    permissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"]
};

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
