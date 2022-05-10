import type { ExtendedClient } from '../client';
import type { MessageContextMenuInteraction } from 'discord.js';
import type { ApplicationCommandData } from "../../../src/index"

export const data: ApplicationCommandData = {
    name: 'messageContent',
    type: "MESSAGE_CONTEXT_MENU",
    global: true
};

export const run = async (client: ExtendedClient, interaction: MessageContextMenuInteraction) => {
    await interaction.followUp({ content: `Targetted message's content: **${interaction.targetMessage.content}**` });
};
