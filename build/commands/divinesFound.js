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
const url = `https://poswebapiservice.azurewebsites.net/api/DivinePool`;
//const url = 'https://localhost:7148/api/DivinePool'
const current = 1;
class divinePool {
    constructor(add) {
        this.id = current;
        this.amount = add;
    }
}
exports.data = new builders_1.SlashCommandBuilder()
    .setName("divinesfound")
    .setDescription("Adds to the divines found this league").addStringOption(option => option
    .setName("amount")
    .setDescription("amount to add.")
    .setRequired(true));
function execute(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(interaction === null || interaction === void 0 ? void 0 : interaction.channelId)) {
            return;
        }
        const amount = interaction.options.getString("amount");
        const { user } = interaction;
        const fetch = require('node-fetch');
        const https = require('https');
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        function grab() {
            return __awaiter(this, void 0, void 0, function* () {
                let unit;
                try {
                    unit = Number(amount);
                }
                catch (error) {
                    unit = 0;
                }
                let payload = new divinePool(unit);
                let res = yield fetch(url, { method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    agent: httpsAgent
                });
                console.log(JSON.stringify(res));
                return res;
            });
        }
        try {
            const res = yield grab().then(res => { return res.json(); }).then(res => res);
            console.log(res[0].amount);
            return interaction.reply({
                content: res[0].amount.toString() + " Total divines found/bought this league." +
                    ` \n ${user} Was the last to Tap that pool with ${amount} Divine Orbs.`,
                ephemeral: false,
            });
        }
        catch (error) {
            let res = "Error in div.found";
            return interaction.reply({
                content: res,
                ephemeral: false,
            });
        }
    });
}
exports.execute = execute;
//# sourceMappingURL=divinesfound.js.map