'use strict';

import load_config from './init/load_config.js';
import { get_access_token , token_info, get_id_calendar, get_all_event, get_event_week } from './service/google/index.js';

await load_config();

// await get_access_token(
//     global.CLIENT_ID_GG,
//     global.CLIENT_SECRET_GG,
//     global.REFRESH_TOKEN_GG
// );

// await token_info(global.TOKEN_GG);

// await get_id_calendar(global.TOKEN_GG);

// await get_all_event(global.TOKEN_GG);

await get_event_week(global.TOKEN_GG, "lytranvinh.work@gmail.com");
