"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName("help")
    .setDescription("Monster Mod Help").addStringOption(option => option.setName("mod").setDescription("Search for a Monster Mod and its Details").setRequired(true));
const url = `https://poswebapiservice.azurewebsites.net/api/MonsterMod/Name?name=`;
class mobdata {
    constructor(userResponse) {
        this.id = userResponse.id;
        this.modName = userResponse.modName;
        this.modEffects = userResponse.modEffects;
    }
}
function execute(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(interaction === null || interaction === void 0 ? void 0 : interaction.channelId)) {
            return;
        }
        const channel = yield client.channels.fetch(interaction.channelId);
        if (!channel || channel.type != "GUILD_TEXT") {
            return;
        }
        const mName = interaction.options.getString("mod");
        const { user } = interaction;
        const res = yield fetch(url + mName).then(res => res.json()).then(res => res);
        console.log(res.modName);
        console.log(res.modEffects);
        return interaction.reply({
            content: res.modName + "\n" + res.modEffects,
            ephemeral: false,
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=help.js.map