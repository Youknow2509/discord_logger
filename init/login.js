import { Events } from 'discord.js';
import axios from 'axios';

function createWeatherMessage(data) {
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
}

const login = async (clientInstance, token) => {
    await clientInstance.login(token);

    await clientInstance.once(Events.ClientReady, (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    // TODO
    await clientInstance.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }

        if (interaction.commandName === 'weather') {
            const url =
                `https://api.weatherapi.com/v1/current.json?key=${global.KEY_API_WEATHER}&q=hanoi`;

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

        }
    });
};

export default login;
