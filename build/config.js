"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;
if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
    throw new Error("missing environment variables");
}
const config = {
    CLIENT_ID,
    GUILD_ID,
    DISCORD_TOKEN
};
exports.default = config;
//# sourceMappingURL=config.js.map