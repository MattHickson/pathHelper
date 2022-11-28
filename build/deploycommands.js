"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const config_1 = require("./config");
const commandModules = require("./commands");
const commands = [];
for (const module of Object.values(commandModules)) {
    commands.push(module.data);
}
const rest = new rest_1.REST({ version: '9' }).setToken(config_1.default.DISCORD_TOKEN);
rest.put(v9_1.Routes.applicationGuildCommands(config_1.default.CLIENT_ID, config_1.default.GUILD_ID), { body: commands }).then(() => {
    console.log("App Commands!!!");
}).catch(console.error);
//# sourceMappingURL=deploycommands.js.map