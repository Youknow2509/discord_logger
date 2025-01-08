import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        await interaction.reply('Pong!');
    } catch (error) {
        console.error(error);
    }
};

export default {
    data,
    execute,
};
