import axios from 'axios';

const token_info = async (token) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`;
    const headers = {};
    const data = {};

    // console.log(data);

    try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        return true;
    } catch (error) {
        console.log(error);
    }
};

export default token_info;
