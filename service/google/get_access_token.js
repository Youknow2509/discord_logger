import token_info from './token_info.js';
import handle_refresh_token from './handle_refresh_token.js';

const get_access_token = async (client_id, client_secret, refresh_token_ip) => {
    const globalAccessToken = global.TOKEN_GG; // Renamed to avoid conflict
    const isAccessTokenValid = await token_info(globalAccessToken); // Renamed for clarity
    if (isAccessTokenValid) {
        console.log('Access token is valid, using the global one');
        return globalAccessToken; // Return the global access token if valid
    }

    const newAccessToken = await handle_refresh_token(
        client_id,
        client_secret,
        refresh_token_ip
    );
    global.TOKEN_GG = newAccessToken; // Update the global access token
    console.log(`New access token: ${newAccessToken}`);
    return newAccessToken;
};

export default get_access_token;
