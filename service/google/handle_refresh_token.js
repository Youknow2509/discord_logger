import axios from 'axios';

const handle_refresh_token = async (client_id, client_secret, refresh_token) => {
    const url = 'https://oauth2.googleapis.com/token';
    const headers = {

    };
    const data_curl = {
        client_id,
        client_secret, 
        refresh_token,
        grant_type: "refresh_token"
    };

    // console.log(data);
    try {
        const response = await axios.post(url, data_curl);
        
        const data = response.data;
        const access_token = data?.access_token;
        const expires_in = data?.expires_in;
        const scope = data?.scope;
        const token_type = data?.token_type;

        console.log(`Access Token: ${access_token}`);
        
        return access_token
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export default handle_refresh_token;