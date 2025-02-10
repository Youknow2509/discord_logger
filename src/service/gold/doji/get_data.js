import axios from 'axios';

const get_data_api = async () => {
    try {
        const url = 'http://giavang.doji.vn/?q=doji/get/json/gia_vang_quoc_te';
        const response = await axios.get(url);

        // pare to json response
        let rawData = response.data;
        // Check if data is a string and contains bad escape sequences
        if (typeof rawData === 'string') {
            try {
                // Fix invalid escape sequences by replacing \x with proper encoding
                rawData = rawData.replace(
                    /\\x([0-9A-Fa-f]{2})/g,
                    (match, hex) => String.fromCharCode(parseInt(hex, 16))
                );

                // Now try parsing as JSON
                const jsonData = JSON.parse(rawData);
                // console.log('Parsed JSON:', jsonData);
                return jsonData;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.log('Raw response data:', rawData);
            }
        } else {
            console.log('Data is already an object:', rawData);
        }

    } catch (e) {
        console.error(e);
        return null;
    }
};

export default get_data_api;
