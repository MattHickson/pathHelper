import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction, TextChannel} from "discord.js";
import {parseResponse} from "@discordjs/rest";


const url = `https://poswebapiservice.azurewebsites.net/api/DivinePool`
//const url = 'https://localhost:7148/api/DivinePool'
const current = 1

class divinePool {
    "id": number;
    "amount": number;

    constructor(add: number) {
        this.id = current;
        this.amount = add;
    }
}


export const data = new SlashCommandBuilder()
    .setName("divinesfound")
    .setDescription("Adds to the divines found this league").addStringOption(option => option
        .setName("amount")
        .setDescription("amount to add.")
        .setRequired(true))

export async function execute(interaction: CommandInteraction, client: Client) {
    if (!interaction?.channelId) {
        return
    }
    const amount = interaction.options.getString("amount")
    const {user} = interaction;
    const fetch = require('node-fetch');
    const https = require('https');

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    async function grab() {
        let unit;
        try{
             unit = Number(amount);
        }catch (error){
            unit = 0;
        }
        let payload = new divinePool(unit)

        let res = await fetch(url, {method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            agent: httpsAgent
        });
        console.log(JSON.stringify(res));

        return res;
    }

    try {
        const res = await grab().then(res => {return res.json()}).then(res => res as divinePool[]);
        console.log(res[0].amount);



        return interaction.reply({

            content: res[0].amount.toString() + " Total divines found/bought this league." +
                ` \n ${user} Was the last to Tap that pool with ${amount} Divine Orbs.`,
            ephemeral: false,
        })
    } catch (error) {
        let res = "Error in div.found"
        return interaction.reply({

            content: res,
            ephemeral: false,
        })
    }
}
