import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getListCommands = async () => {
    var commands = [];

    // Grab all the command folders from the commands directory
    const foldersPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(foldersPath);

    for (const file of commandFiles) {
        const pathFile = path.join(foldersPath, file);

        // Check if the file ends with .js
        if (file.endsWith('.js')) {
            // Dynamically import the command file
            const commandModul = await import(pathFile); // Use require for CommonJS or dynamic import for ES modules
            const command = commandModul.default;

            // Check if the command has 'data' and 'execute' properties
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON()); // Push the command data to the commands array
                // console.log(command.data.toJSON());
            } else {
                console.log(
                    `[WARNING] The command at ${pathFile} is missing a required "data" or "execute" property.`
                );
            }
        }
    }

    return commands;
};

const registerSlashCommand = async (token) => {
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);
    const commands = await getListCommands(); // Get the list of commands

    // and deploy your commands!
    try {
        // Register the commands to the Discord API
        const data = await rest.put(
            Routes.applicationGuildCommands(
                global.APPLICATION_ID,
                global.GUILD_ID
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
};

export default registerSlashCommand;
