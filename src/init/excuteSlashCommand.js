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
                commands.push(command);
            } else {
                console.log(
                    `[WARNING] The command at ${pathFile} is missing a required "data" or "execute" property.`
                );
            }
        }
    }

    return commands;
};

const excuteSlashCommand = async (clientInstance) => {
    await clientInstance.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        var commands = await getListCommands();
        for (var i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (interaction.commandName === command.data.name) {
                await command.execute(interaction);
                break;
            }
        }
    });
};

export default excuteSlashCommand;
