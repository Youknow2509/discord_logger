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

const formatEvents = (response) => {
    let formattedString = `Summary: ${response.summary}\n`;
    formattedString += `Updated: ${response.updated}\n`;
    formattedString += `Time Zone: ${response.timeZone}\n\n`;
    formattedString += 'Events:\n';

    const events = response.items;

    events.forEach((event) => {
        formattedString += `- Summary: ${event.summary}\n`;
        formattedString += `  Description: ${event.description}\n`;
        formattedString += `  Location: ${event.location}\n`;
        formattedString += `  Start: ${formatDateTime(
            event.start.dateTime || event.start.date
        )}\n`;
        formattedString += `  End: ${formatDateTime(
            event.end.dateTime || event.end.date
        )}\n`;
        formattedString += `  Link: ${event.htmlLink}\n`;
        formattedString += `  Status: ${event.status}\n`;
        formattedString += `  Created: ${formatDateTime(event.created)}\n`;
        formattedString += `  Updated: ${formatDateTime(event.updated)}\n`;
        formattedString += `\n`;
    });

    return formattedString;
};

const get_event_week = async (token, idCalendar) => {
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
        console.log(formatEvents(data));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // interaction.reply(`Error: ${error.message}`);
    }
};

export default get_event_week;
