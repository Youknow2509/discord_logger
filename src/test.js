// import load_config from './init/load_config.js';
import { getData, getDataTable, getTimeData } from './service/pnj/index.js';

// await load_config();

var data = await getData();

// console.log(data);

var table = await getDataTable(data);

// console.log(table);

var timeData = await getTimeData(data);

if (timeData) {
    console.log('Time: ', timeData);
} else {
    console.log('Error getting time data');
}