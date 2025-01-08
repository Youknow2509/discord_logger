import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

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

const sendEmbed = async (response) => {
    const embed = new EmbedBuilder()
        .setTitle(`Events for ${response.summary}`)
        .setDescription(
            `Updated: ${formatDateTime(response.updated)}\nTime Zone: ${
                response.timeZone
            }`
        )
        .setColor('#0099ff');

    const fields = response.items.map((event) => ({
        name: event.summary,
        value:
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
        inline: true, // Inline fields
    }));

    embed.addFields(fields);

    return embed;
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

    // console.log(url);

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;
        // console.log(data);

        const embed = await sendEmbed(data);

        return embed;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // interaction.reply(`Error: ${error.message}`);
        return null;
    }
};

export default get_event_week_to_embed;
