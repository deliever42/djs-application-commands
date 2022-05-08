import { Client, Collection } from 'discord.js';
import { ApplicationCommandManager } from '../../src';
import { CommandHandler } from './handlers/command';
import { EventHandler } from './handlers/event';

export class ExtendedClient extends Client {
    public cache = { commands: new Collection<string, any>(), events: new Collection<string, any>() };
    public applicationCommandManager: ApplicationCommandManager;
    public constructor(token: string) {
        super({
            intents: 32767,
            partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
            shards: 'auto',
        });

        this.applicationCommandManager = new ApplicationCommandManager((this as unknown) as Client);

        new CommandHandler(this);
        new EventHandler(this);

        this.login(token);
    }
}
