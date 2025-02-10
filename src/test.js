import { get_data_api, pare_data } from './service/gold/doji/index.js';

var data = await get_data_api();

const pare_d = pare_data(data);

console.log("Type of data after pare: " + typeof pare_d);
const json_string = JSON.stringify(pare_d);
console.log("Data after pare: ");
console.log(json_string);
