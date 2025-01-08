
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = async () => {
    const clientInstance = new Client({ 
        intents: [
            GatewayIntentBits.Guilds, 
            // GatewayIntentBits.GuildMessages,
            // GatewayIntentBits.MessageContent,
        ]
    });

    return clientInstance;
}

export default client;