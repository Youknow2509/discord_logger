
import * as cheerio from 'cheerio';

const getTimeData = async (data) => {
    try {
        const $ = cheerio.load(data);
        const time = $('#time-now').text();
        return time;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default getTimeData;