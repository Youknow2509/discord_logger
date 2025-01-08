import { createClient } from 'redis';

let statusConnection = {
    CONNECT: 'connect',
    ERROR: 'error',
    END: 'end',
    CLOSE: 'close',
    RECONNECT: 'reconnecting',
};

const handleEventConnection = (client) => {
    if (client === null) {
        return;
    }

    client.on(statusConnection.CONNECT, () => {
        console.log('Connected to Redis...');
    });

    client.on(statusConnection.ERROR, (error) => {
        console.log('Error to connect Redis...', error);
    });

    client.on(statusConnection.END, () => {
        console.log('End to connect Redis...');
    });

    client.on(statusConnection.CLOSE, () => {
        console.log('Close to connect Redis...');
    });

    client.on(statusConnection.RECONNECT, () => {
        console.log('Reconnecting to Redis...');
    });
};

const initRedis = async () => {
    const initRedis = createClient({
        username: global.REDIS_USER,
        password: global.REDIS_PASSWORD,
        socket: {
            host: global.REDIS_HOST,
            port: global.REDIS_PORT,
        },
    });
    //
    global.REDIS_CLIENT = initRedis;

    handleEventConnection(initRedis);
};

const getRedis = () => global.REDIS_CLIENT;

const closeRedis = async () => {
    await getRedis().disconnect();
};

const connectRedis = async () => {
    await getRedis().connect();
};

export { initRedis, getRedis, closeRedis, connectRedis };
