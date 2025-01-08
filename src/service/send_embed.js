
const send_embed = async (channel, topic, bindingKey, body, type) => {
    var cl;
    switch (type) {
        case global.LOGGER_INFO:
            cl = 0x0099ff;
            break;
        case global.LOGGER_WARNING:
            cl = 0xFFE600;
            break;
        case global.LOGGER_DANGER:
            cl = 0xFF001A;
            break;
        default:
            cl = 0x0099ff;
    }

    const embed = {
        color: cl,
        title: 'Logger',
        url: 'https://github.com/Youknow2509/',
        author: {
            name: 'Ly Tran Vinh',
            icon_url: 'https://avatars.githubusercontent.com/u/88392742',
            url: 'https://github.com/Youknow2509/',
        },
        description: `Logger ${topic}`,
        thumbnail: {
            url: 'https://avatars.githubusercontent.com/u/88392742',
        },
        fields: [
            {
                name: 'Log',
                value: body,
            },
            // {
            //     name: '\u200b',
            //     value: '\u200b',
            //     inline: false,
            // },
            // {
            //     name: 'Inline field title',
            //     value: 'Some value here',
            //     inline: true,
            // },
            // {
            //     name: 'Inline field title',
            //     value: 'Some value here',
            //     inline: true,
            // },
            // {
            //     name: 'Inline field title',
            //     value: 'Some value here',
            //     inline: true,
            // },
        ],
        // image: {
        //     url: 'https://i.imgur.com/AfFp7pu.png',
        // },
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Contact to: lytranvinh.work@gmail.com',
            icon_url: 'https://avatars.githubusercontent.com/u/88392742',
            url: 'https://github.com/Youknow2509/',
        },
    };

    await channel.send({ embeds: [embed] });
}

export default send_embed;