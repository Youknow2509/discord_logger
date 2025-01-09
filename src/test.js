
import load_config from './init/load_config.js';
import chat_ai from './commands/chat_ai.js';

await load_config();

await chat_ai();