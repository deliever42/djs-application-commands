# Discord.JS New Discord Application Commands

### A module for Discord's new app commands, it can be used with Discord.JS

#

#

# Example

```js
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

const {
    ApplicationCommandManager,
    ApplicationCommandBuilder,
} = require('discord.js-new-application-commands');

client.on('ready', async () => {
    client.applicationCommandManager = new ApplicationCommandManager(client);

    const commands = [
        new ApplicationCommandBuilder()
            .setName('ban')
            .setGlobal(false)
            .setPermissions(['BAN_MEMBERS'])
            .setDescription('Ban a member')
            .addUserOption(builder => {
                return builder
                    .setName('user')
                    .setDescription('User to ban')
                    .setRequired(true);
            })
            .addStringOption(builder => {
                return builder
                    .setName('reason')
                    .setDescription('Reason to ban')
                    .setRequired(false);
            })
            .addIntegerOption(builder => {
                return builder
                    .setName('deleteMessageDays')
                    .setDescription('Number of days of messages to delete')
                    .setMaxValue(7)
                    .setMinValue(1)
                    .setRequired(false);
            }),
        new ApplicationCommandBuilder()
            .setName('ping')
            .setGlobal(true)
            .setDescription("Get the bot's ping"),
    ];

    const resolvedCommands = [
        commands.filter(cmd => cmd.global),
        commands.filter(cmd => !cmd.global),
    ];

    //saving global commands
    client.applicationCommandManager.set(resolvedCommands[0]);

    //saving guild commands
    for (const guildId of [...client.guilds.cache.keys()]) {
        client.applicationCommandManager.set(resolvedCommands[1], guildId);
    }

    //saving commands on new guild
    client.on('guildCreate', guild => {
        client.applicationCommandManager.set(resolvedCommands[1], guild.id);
    });

    client.on('interactionCreate', async interaction => {
        if (interaction.isApplicationCommand()) {
            const cmd = client.applicationCommandManager.cache.get(interaction.commandName);
            if (!cmd) return;

            await interaction.deferReply({ ephemeral: true });

            switch (cmd.name) {
                case 'ping':
                    await interaction.followUp({
                        content: `Pong! :ping_pong: **${client.ws.ping}**ms`,
                    });
                    break;
                case 'ban':
                    const user = interaction.options.getUser('user');
                    const reason = interaction.options.getString('reason') ?? 'No Reason Provided.';
                    const deleteMessageDays = interaction.options.getInteger('deleteMessageDays');

                    interaction.guild.bans
                        .create(user.id, { reason, days: deleteMessageDays })
                        .then(async () => {
                            await interaction.followUp({
                                content: 'This user successfully banned.',
                            });
                        })
                        .catch(async () => {
                            await interaction.followUp({
                                content:
                                    "An error occurred while banning the member. The member's authority may be above my authority.",
                            });
                        });

                    break;
            }
        }
    });
});

client.login('your-token-goes-here');
```
