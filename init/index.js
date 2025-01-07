import load_config from './load_config.js';
import client from './client_instance.js';
import login from './login.js';
import initRabbitmqComsummer from './rabbitmq.js';
import consumeMessages from '../service/consumeMessages.js';
import send_embed from '../service/send_embed.js';
import initServer from './server.js';
import registerSlashCommand from './registerSlashCommand.js';
import excuteSlashCommand from './excuteSlashCommand.js';

const init = async () => {
    // Load config
    await load_config();
    console.log('Loaded config');

    // Create client instance
    const clientInstance = await client();
    console.log('Client instance created');

    // Login to discord
    await login(clientInstance, global.TOKEN);
    global.DISCORD_CLIENT = clientInstance;

    // handle slash commands
    await registerSlashCommand(global.TOKEN);
    await excuteSlashCommand(clientInstance);

    // get channel discord instance
    await getChannelDiscord(clientInstance, global.CHANNEL_ID);

    // RabbitMQ consumer
    await initRabbitmqComsummer();
    console.log('RabbitMQ consumer is ready');

    const bindingKey = 'logger.info';
    const exchange = 'logger_discord';
    await consumeMessages(global.CHANNEL_RABBITMQ, exchange, bindingKey);

    send_embed(
        global.CHANNEL_LOGGER,
        exchange,
        '',
        'Logger started !!!',
        global.LOGGER_WARNING
    );

    // Start server
    var app = await initServer();

    const port = process.env.PORT_SERVER || 3000;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

const getChannelDiscord = async (clientInstance, channelID) => {
    try {
        const channel = await clientInstance.channels.fetch(channelID);
        // console.log(channel);
        if (!channel) {
            console.error('Channel not found');
            return;
        }
        console.log('Channel created');

        global.CHANNEL_LOGGER = channel;
    } catch (error) {
        console.error(error);
    }
};

export default init;
