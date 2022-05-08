import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'customguild',
    description: 'Custom Guild Command',
    type: "SLASH_COMMAND",
    guildId: "932633073454039060"
};

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
