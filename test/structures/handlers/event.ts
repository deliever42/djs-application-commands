import type { ExtendedClient } from '../client';
import { readdirSync } from "fs"
import { join } from "path"

export class EventHandler {
    public constructor(client: ExtendedClient) {
        const files = readdirSync(join(__dirname, "..", "events")).filter(file => file.endsWith(".js"))


        for (const file of files) {
            const event = require(join(__dirname, "..", "events", file))

            client.cache.events.set(event.data.name, event)
            client.on(event.data.name, (...params) => { event.run(client, ...params) })


        }

    }
}
