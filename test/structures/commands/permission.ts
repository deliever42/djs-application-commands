import type { ExtendedClient } from '../client';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandBuilder } from "../../../src/index"

export const data = new ApplicationCommandBuilder()
    .setName("permission")
    .setDescription("Permission Command")
    .setType("SLASH_COMMAND")
    .setPermissions(["MANAGE_ROLES", "MANAGE_CHANNELS"])

export const run = async (client: ExtendedClient, interaction: CommandInteraction) => {
    await interaction.followUp({ content: "Successfully!" });
};
