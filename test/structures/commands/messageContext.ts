import type { ExtendedClient } from '../client';
import type { MessageContextMenuInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("messageContent")
    .setType("MESSAGE_CONTEXT_MENU")
    .setGlobal(true)

export const run = async (client: ExtendedClient, interaction: MessageContextMenuInteraction) => {
    await interaction.followUp({ content: `Targetted message's content: **${interaction.targetMessage.content}**` });
};
