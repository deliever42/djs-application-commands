import { CommandHandler } from '../handlers/command';
import type { ExtendedClient } from "../client"
import { ApplicationCommandManager } from '../../../src/index';
import type { Client } from "discord.js"

export const data = {
    name: 'ready',
};

export const run = (client: ExtendedClient) => {
    console.log('Bot Online');

    client.applicationCommandManager = new ApplicationCommandManager(client as Client);

    new CommandHandler(client);
};
