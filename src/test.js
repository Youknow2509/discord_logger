
import load_config from './init/load_config.js';

import { initRedis, getRedis } from './init/redis.js';

await load_config();

await initRedis();

const r = await getRedis();

await r.connect();