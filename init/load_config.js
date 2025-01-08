import dotenv from 'dotenv';

const load_config = async () => {
    dotenv.config();

    global.TOKEN = process.env.TOKEN;
    global.CHANNEL_ID = process.env.CHANNEL_ID;
    global.RABBITMQ_URL = process.env.RABBITMQ_URL;
    global.KEY_API_WEATHER = process.env.KEY_API_WEATHER;
    global.APPLICATION_ID = process.env.APPLICATION_ID;
    global.GUILD_ID = process.env.GUILD_ID;
    // load init gg
    global.CLIENT_ID_GG = process.env.CLIENT_ID_GG;
    global.PROJECT_ID_GG = process.env.PROJECT_ID_GG;
    global.CLIENT_SECRET_GG = process.env.CLIENT_SECRET_GG;
    global.TOKEN_GG = process.env.TOKEN_GG;
    global.REFRESH_TOKEN_GG = process.env.REFRESH_TOKEN_GG;
};

export default load_config;
