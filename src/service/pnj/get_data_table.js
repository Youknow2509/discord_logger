
import * as cheerio from 'cheerio';

const getDataTable = async (data) => {
    try {
        const $ = cheerio.load(data);
        const table = $('table').first();
        const rows = table.find('tr');
        const result = [];
        rows.each((index, row) => {
            const cols = $(row).find('td');
            const row_data = [];
            cols.each((index, col) => {
                row_data.push($(col).text().trim());
            });
            result.push(row_data);
        });
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default getDataTable;
