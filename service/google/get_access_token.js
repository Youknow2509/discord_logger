import axios from 'axios';

const get_access_token = async (client_id, client_secret, refresh_token) => {
    const url = 'https://oauth2.googleapis.com/token';
    const headers = {

    };
    const data = {
        client_id,
        client_secret, 
        refresh_token,
        grant_type: "refresh_token"
    };

    // console.log(data);

    axios
            .post(url, data)
            .then((response) => {
                var data = response.data;
                // console.log(data);
                const access_token = data?.access_token;
                const expires_in = data?.expires_in;
                const scope = data?.scope;
                const token_type = data?.token_type;

                console.log(`Access Token: ${access_token}`);
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                // interaction.reply(`Error: ${error.message}`);
            });
}

export default get_access_token;