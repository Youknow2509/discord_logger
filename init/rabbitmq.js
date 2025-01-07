// import
import amqp from 'amqplib';

const initRabbitmqComsummer = async () => {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(global.RABBITMQ_URL);
        const channel = await connection.createChannel();

        global.CHANNEL_RABBITMQ = channel;
    } catch (error) {
        console.error(error);
    }
};

export default initRabbitmqComsummer;
