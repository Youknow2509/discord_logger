import load_config from './load_config.js';
import client from './client_instance.js';
import login from './login.js';
import initRabbitmqComsummer from './rabbitmq.js';
import consumeMessages from '../service/consumeMessages.js'

const init = async () => {

    await load_config();
    console.log("Loaded config");

    const clientInstance = await client();
    console.log("Client instance created");
    
    await login(clientInstance, global.TOKEN);
    global.DISCORD_CLIENT = clientInstance;
    
    const channel = await clientInstance.channels.fetch(global.CHANNEL_ID);
    console.log(channel);
    if (!channel) {
        console.error("Channel not found");
        return;
    }
    console.log("Channel created");
    
    global.CHANNEL_LOGGER = channel;

    console.log("Bot is ready");

    await initRabbitmqComsummer();
    console.log("RabbitMQ consumer is ready");

    const bindingKey = "logger.info";
    const exchange = "logger_discord"
    await consumeMessages(global.CHANNEL_RABBITMQ, exchange, bindingKey);

};

export default init;