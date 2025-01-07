
import { Events } from "discord.js";

const login = async (clientInstance, token) => {
    await clientInstance.login(token);

    await clientInstance.once(Events.ClientReady, (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });
};

export default login;