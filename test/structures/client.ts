import { Client, Collection } from 'discord.js';
import type { ApplicationCommandManager, ApplicationCommandData } from '../../src/index';
import { EventHandler } from './handlers/event';

export class ExtendedClient extends Client {
    public cache = { commands: new Collection<string, { data: ApplicationCommandData, run: (...args: any[]) => any }>(), events: new Collection<string, { data: { name: string }, run: (...args: any[]) => any }>() };
    public applicationCommandManager!: ApplicationCommandManager;
    public constructor(token: string) {
        super({
            intents: 32767,
            partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
            shards: 'auto',
        });

        new EventHandler(this);

        this.login(token);
    }
}
