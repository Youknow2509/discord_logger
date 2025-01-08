import axios from 'axios';

const formatDateTime = (dateTime) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(dateTime).toLocaleString('en-US', options);
};

const sendEmbed = async (channel, response) => {
    const embed = new MessageEmbed()
        .setTitle(`Events for ${response.summary}`)
        .setDescription(
            `Updated: ${formatDateTime(response.updated)}\nTime Zone: ${
                response.timeZone
            }`
        )
        .setColor('#0099ff');

    response.items.forEach((event) => {
        embed.addField(
            event.summary,
            `**Description:** ${event.description}\n` +
                `**Location:** ${event.location}\n` +
                `**Start:** ${formatDateTime(
                    event.start.dateTime || event.start.date
                )}\n` +
                `**End:** ${formatDateTime(
                    event.end.dateTime || event.end.date
                )}\n` +
                `**Link:** [Event Link](${event.htmlLink})\n` +
                `**Status:** ${event.status}\n` +
                `**Created:** ${formatDateTime(event.created)}\n` +
                `**Updated:** ${formatDateTime(event.updated)}`,
            false // Inline fields
        );
    });

    await channel.send({ embeds: [embed] });
};

const get_event_week_to_embed = async (token, idCalendar) => {
    const timeMin = new Date().toISOString();
    // after the current time 7 days ago
    const timeMax = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${idCalendar}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(url);

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;
        console.log(data);

        await sendEmbed(interaction.channel, data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // interaction.reply(`Error: ${error.message}`);
    }
};

export default get_event_week_to_embed;
