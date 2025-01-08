import axios from 'axios';

const get_id_calendar = async (token) => {
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // interaction.reply(`Error: ${error.message}`);
    }
};

export default get_id_calendar;
