import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

const createWeatherMessage = (data) => {
    return (
        `Thông tin thời tiết hiện tại tại ${data?.location?.name}, ${data?.location?.country}:\n` +
        `- Nhiệt độ: ${data?.current?.temp_c}°C\n` +
        `- Tình trạng thời tiết: ${data?.current?.condition?.text}\n` +
        `- Hướng gió: ${data?.current?.wind_dir}\n` +
        `- Tốc độ gió: ${data?.current?.wind_mph} mph\n` +
        `- Độ ẩm: ${data?.current?.humidity}%\n` +
        `- Áp suất: ${data?.current?.pressure_mb} mb\n` +
        `- Tầm nhìn: ${data?.current?.vis_km} km\n` +
        `- Cảm giác như: ${data?.current?.feelslike_c}°C\n` +
        `- Chỉ số UV: ${data?.current?.uv}\n` +
        `- Mây: ${data?.current?.cloud}%`
    );
};

const data = new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Replies the weather in City State')
    .addStringOption((option) =>
        option
            .setName('city')
            .setDescription('The input the City State')
            .setRequired(true)
    );

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        const city = interaction.options.getString('city');
        const url = `https://api.weatherapi.com/v1/current.json?key=${global.KEY_API_WEATHER}&q=${city}`;

        axios
            .get(url)
            .then((response) => {
                var data = response.data;
                const weatherMessage = createWeatherMessage(data);
                interaction.reply(weatherMessage);
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
            });
    } catch (error) {
        console.error(error);
    }
};

export default {
    data,
    execute,
};
