import { SlashCommandBuilder } from 'discord.js';
import { getData, getDataTable, getTimeData } from '../service/pnj/index.js';

const data = new SlashCommandBuilder()
    .setName('gold')
    .setDescription('Lấy giá vàng PNJ gần nhất.');

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;

    try {
        await interaction.deferReply(); // Acknowledge the command
        
        const cache = await checkCache();
        if (cache) {
            await interaction.editReply({ embeds: [cache] });
            return;
        }

        const data = await getData();
        const dataTable = await getDataTable(data);
        const timeData = await getTimeData(data);

        var embed = {
            color: 0x0099ff,
            title: `Giá vàng: ${timeData}`,
            // description: 'Here is the response from AI',
            author: {
                name: 'Ly Tran Vinh',
                icon_url: 'https://avatars.githubusercontent.com/u/88392742',
                url: 'https://github.com/Youknow2509/',
            },
            fields: [],
        };

        for (var i = 0; i < dataTable.length; i++) {
            var sizr_arr = dataTable[i].length;
            console.log(dataTable[i]);
            if (sizr_arr === 3) {
                embed.fields.push({
                    name: dataTable[i][0],
                    value: `Bán ra: ${dataTable[i][1]} - Mua vào: ${dataTable[i][2]}`,
                });
            }
        }

        // save in cache
        const key = `pnj`;
        await global.REDIS_CLIENT.set(key, JSON.stringify(embed));
        await global.REDIS_CLIENT.expire(key, 60*60*7); // 6 hours

        await interaction.editReply({ embeds: [embed] });
    } catch (e) {
        console.error(e);
    }
};

const checkCache = async () => {
    const key = `pnj`;
    const cache = await global.REDIS_CLIENT.get(key);
    if (cache) {
        return JSON.parse(cache);
    }
    return null;
};

export default {
    data,
    execute,
};
