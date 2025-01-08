import { SlashCommandBuilder } from 'discord.js';
import {
    get_event_week_to_embed,
    get_access_token,
} from '../service/google/index.js';

const data = new SlashCommandBuilder()
    .setName('calender')
    .setDescription('Calender show');

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        // get calendar
        const token = await get_access_token(
            global.CLIENT_ID_GG,
            global.CLIENT_SECRET_GG,
            global.REFRESH_TOKEN_GG
        );
        const idCalendar = 'lytranvinh.work@gmail.com';

        const embedCalendar = await get_event_week_to_embed(token, idCalendar);

        await interaction.reply({ embeds: [embedCalendar] });
    } catch (error) {
        console.error(error);
    }
};

export default {
    data,
    execute,
};
