# Discord.JS New Discord Application Commands

### A module for Discord's new app commands, it can be used with Discord.JS

#

#

# Example

```js
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
const { ApplicationCommandManager, ApplicationCommandBuilder } = require('discord.js-new-application-commands');

client.on('ready', async () => {
    client.applicationCommandManager = new ApplicationCommandManager(client);

    const commands = [
        new ApplicationCommandBuilder()
            .setName("ban")
            .setGlobal(false)
            .setPermissions(["BAN_MEMBERS"])
            .setDescription("Ban a member")
            .addUserOption((builder) => {
                return builder
                    .setName("user")
                    .setDescription("User to ban")
                    .setRequired(true)
            })
            .addStringOption((builder) => {
                return builder
                    .setName("reason")
                    .setDescription("Reason to ban")
                    .setRequired(false)
            })
    ];
});
```
