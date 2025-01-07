
const send_message = async (channel, msg) => {
    await channel.send(msg);
}

export default send_message;