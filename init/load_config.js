import dotenv from 'dotenv';

const load_config = async () => {
    dotenv.config();
    
    global.TOKEN = process.env.TOKEN;
    global.CHANNEL_ID = process.env.CHANNEL_ID;
    global.RABBITMQ_URL = process.env.RABBITMQ_URL;
};

export default load_config;
