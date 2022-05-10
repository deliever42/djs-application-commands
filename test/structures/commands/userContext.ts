import type { ExtendedClient } from '../client';
import type { UserContextMenuInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("username")
    .setType("USER_CONTEXT_MENU")
    .setGlobal(true)

export const run = async (client: ExtendedClient, interaction: UserContextMenuInteraction) => {
    await interaction.followUp({ content: `Username: **${interaction.targetUser.username}**` });
};
