import { SlashCommandBuilder } from 'discord.js';
import { get_data_api, pare_data } from '../service/gold/doji/index.js';


const data = new SlashCommandBuilder()
    .setName('gold_v2')
    .setDescription('Lấy giá vàng SJC xử dụng api doji.');

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        await interaction.deferReply(); // Acknowledge the command
        
        const cache = await checkCache();
        if (cache) {
            const embed = create_embed(cache);
            await interaction.editReply({ embeds: [embed] });
            return;
        }

        const data = await get_data_api();
        const data_obj = pare_data(data);

        // save in cache
        const key = `doji-gold`;
        await global.REDIS_CLIENT.set(key, JSON.stringify(data_obj));
        await global.REDIS_CLIENT.expire(key, 60*60*4); // 3 hours

        const embed = create_embed(data_obj);

        await interaction.editReply({ embeds: [embed] });
    } catch (e) {
        console.error(e);
    }
};

const create_embed = (data_obj) => {
    var embed = {
        color: 0x0099ff,
        title: `Giá vàng ${data_obj?.updateTime}`,
        // description: 'Here is the response from AI',
        author: {
            name: 'Ly Tran Vinh',
            icon_url: 'https://avatars.githubusercontent.com/u/88392742',
            url: 'https://github.com/Youknow2509/',
        },
        fields: [],
    };

    for (var i = 0; i < data_obj.prices.length; i++) {
        const name = data_obj.prices[i]?.name;
        const buy = data_obj.prices[i]?.buy;
        const sell = data_obj.prices[i]?.sell;

        embed.fields.push({
            name: name,
            value: `Mua: ${buy} - Bán: ${sell}`
        });
    }
    return embed;
};

const checkCache = async () => {
    const key = `doji-gold`;
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