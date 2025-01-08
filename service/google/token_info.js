
import axios from "axios";

const token_info = async (token) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`;
    const headers = {};
    const data = {};

    // console.log(data);

    axios
        .get(url)
        .then((response) => {
            var data = response.data;
            console.log(data);

            return true;
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            // interaction.reply(`Error: ${error.message}`);
            return false;
        });
};

export default token_info;
