import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

const initSlashCommand = async (token) => {
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);

    // and deploy your commands!
    (async () => {
        try {
            var commands = [];

            commands.push(
                {
                    data: new SlashCommandBuilder()
                        .setName('ping')
                        .setDescription('Replies with Pong!'),
                    async execute(interaction) {
                        await interaction.reply('Pong!');
                    },
                }.data.toJSON()
            );

            commands.push({
                data: new SlashCommandBuilder()
                    .setName('weather')
                    .setDescription('Replies the weather in Hanoi'),
            }.data.toJSON()
        );

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(
                    '1325677748785512499',
                    '1325742395081363466'
                ),
                { body: commands }
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
};

export default initSlashCommand;
