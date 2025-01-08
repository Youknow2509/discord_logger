import express from 'express';
import send_embed from '../service/send_embed.js';

const initServer = async () => {
    const app = express();

    // handle post request in logger
    app.post('/logger', (req, res) => {
        // query params data
        console.log(req.query?.data);
        // body data
        send_embed(
            global.CHANNEL_LOGGER,
            'logger_discord',
            'logger.info',
            req.query?.data,
            global.LOGGER_WARNING
        );
        res.send('POST request logger');
    });

    return app;
};

export default initServer;
