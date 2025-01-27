const { Client, GatewayIntentBits } = require('discord.js');

// Your bot token
const TOKEN = 'MTMzMzIwMzY3NjYzODIxNjI2NA.GuoLKo.azKl4bJ8lS1jS4Cg_LBpWtwimMPK5cwRD99-Fg';

// Guild ID and Room ID
const GUILD_ID = '1332929419823681748';
const ROOM_ID = '1332929420406816872';

// Create a new Discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!join') {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (guild) {
            const channel = guild.channels.cache.get(ROOM_ID);
            if (channel && channel.isVoice()) {
                const connection = await channel.join();
                connection.voice.setSelfDeaf(true);
                connection.voice.setSelfMute(true);
                message.channel.send(`Joined ${channel.name} and staying muted/deafened.`);
            } else {
                message.channel.send('Voice channel not found.');
            }
        } else {
            message.channel.send('Guild not found.');
        }
    } else if (message.content === '!leave') {
        const connection = client.voice.connections.get(GUILD_ID);
        if (connection) {
            connection.disconnect();
            message.channel.send('Disconnected from the voice channel.');
        } else {
            message.channel.send('I\'m not connected to any voice channel.');
        }
    }
});

client.login(TOKEN);
