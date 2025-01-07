import dotenv from 'dotenv';

const load_config = async () => {
    dotenv.config();

    global.TOKEN = process.env.TOKEN;
    global.CHANNEL_ID = process.env.CHANNEL_ID;
    global.RABBITMQ_URL = process.env.RABBITMQ_URL;
    global.KEY_API_WEATHER = process.env.KEY_API_WEATHER;
    global.APPLICATION_ID = process.env.APPLICATION_ID;
    global.GUILD_ID = process.env.GUILD_ID;
};

export default load_config;
