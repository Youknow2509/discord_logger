import OpenAI from 'openai';
import { Embed, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('chat-ai')
    .setDescription('Chat with AI')
    .addStringOption((option) =>
        option
            .setName('message')
            .setDescription('Message to chat with AI')
            .setRequired(true)
    );

const execute = async (interaction) => {
    if (!interaction.isCommand()) return;
    try {
        await interaction.deferReply(); // Acknowledge the command

        // Get the message from the user
        const message = interaction.options.getString('message');

        // Check if OpenAI API key is set
        const openai = new OpenAI({
            apiKey: global.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: message,
                        },
                    ],
                },
            ],
            model: 'gpt-4o',
        });
        const data =
            completion.choices[0]?.message?.content ?? 'No response from AI';
        console.log(data);

        // Split the message into multiple messages if it exceeds the maximum length
        const maxLength = 1020;
        const messages = splitMessage(data, maxLength);
        var embed = {
            color: 0x0099ff,
            title: 'Câu trả lời: ',
            // description: 'Here is the response from AI',
            author: {
                name: 'Ly Tran Vinh',
                icon_url: 'https://avatars.githubusercontent.com/u/88392742',
                url: 'https://github.com/Youknow2509/',
            },
            fields: [],
        };

        messages.forEach((msg) => {
            embed.fields.push({
                name: '',
                value: msg,
            });
        });

        await interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
};

const splitMessage = (message, maxLength) => {
    const messages = [];
    while (message.length > maxLength) {
        let splitIndex = message.lastIndexOf(' ', maxLength);
        if (splitIndex === -1) splitIndex = maxLength; // If no space found, split at maxLength
        messages.push(message.slice(0, splitIndex));
        message = message.slice(splitIndex).trim(); // Remove leading spaces
    }
    messages.push(message); // Add the remaining part
    return messages;
};

export default {
    data,
    execute,
};
