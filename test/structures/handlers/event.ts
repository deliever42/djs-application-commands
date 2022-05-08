import type { ExtendedClient } from '../client';
import { readdirSync } from "fs"

export class EventHandler {
    public constructor(client: ExtendedClient) {
        const files = readdirSync("./test/structures/events").filter(file => file.endsWith(".js"))
      

            for (const file of files) {
                import(file).then((event) => {
                    
                    client.cache.events.set(event.data.name,event)
                    client.on(event.data.name,(...params) =>{event.run(client,...params)})
                })
                
            }
        
    }
}
