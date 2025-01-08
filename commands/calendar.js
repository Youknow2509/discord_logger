import { SlashCommandBuilder } from 'discord.js';
import {
    get_event_week_to_embed,
    get_access_token,
} from '../service/google/index.js';

const data = new SlashCommandBuilder()
    .setName('calender')
    .setDescription('Calender show');

const getDataApi = async () => {
    // get calendar
    const token = await get_access_token(
        global.CLIENT_ID_GG,
        global.CLIENT_SECRET_GG,
        global.REFRESH_TOKEN_GG
    );
    const idCalendar = 'lytranvinh.work@gmail.com';

    const embedCalendar = await get_event_week_to_embed(token, idCalendar);
    return embedCalendar;
};

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        const key = "calendar::lytranvinh.work@gmail.com";
        const cache = await global.REDIS_CLIENT.get(key);
        if (cache) {
            const decode = JSON.parse(cache);
            await interaction.reply({ embeds: [decode] });
            return;
        }

        const embedCalendar = await getDataApi();
        if (!embedCalendar) {
            await interaction.reply('Không tìm thấy thông tin lịch');
            return;
        }
        const bodyEncode = JSON.stringify(embedCalendar);
        await global.REDIS_CLIENT.set(key, bodyEncode);
        // expire 7 days
        await global.REDIS_CLIENT.expire(key, 60 * 60 * 24 * 7); 

        await interaction.reply({ embeds: [embedCalendar] });
    } catch (error) {
        console.error(error);
    }
};

export default {
    data,
    execute,
};
