import type { ExtendedClient } from '../client';
import type { UserContextMenuInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'username',
    type: "USER_CONTEXT_MENU",
    global: true
};

export const run = async (client: ExtendedClient, interaction: UserContextMenuInteraction) => {
    await interaction.followUp({ content: `Username: **${interaction.targetUser.username}**` });
};
