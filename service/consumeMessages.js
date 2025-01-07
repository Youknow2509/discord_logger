import send_message from './send_message.js';
import send_embed from './send_embed.js'

const consumeMessages = async (channel, topic, bindingKey) => {
    try {
        // Declare a topic exchange
        await channel.assertExchange(topic, 'topic', { durable: true });

        // Declare a queue (anonymous queue for this consumer)
        const queue = await channel.assertQueue('', { exclusive: true });

        console.log(`Waiting for messages in queue: ${queue.queue}`);

        // Bind the queue to the exchange
        await channel.bindQueue(queue.queue, topic, bindingKey);

        // Consume messages
        channel.consume(queue.queue, (msg) => {
            var body = msg.content.toString()
            
            // send_message(global.CHANNEL_LOGGER, body);
            send_embed(global.CHANNEL_LOGGER, topic, bindingKey, body);
            console.log(`Type:: ${typeof body}, Data:: `, body);

        }, { noAck: true });
    
    } catch (error) {
        console.error('Error:', error);
    }
};

export default consumeMessages;
