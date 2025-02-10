import axios from 'axios';

const getData = async () => {
    try {
        const url = "https://www.pnj.com.vn/blog/gia-vang/?zone=11";
        const response = await axios.get(url);
        
        return response.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default getData;