import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction, TextChannel} from "discord.js";
import {parseResponse} from "@discordjs/rest";


export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Monster Mod Help").addStringOption(option => option.setName("mod").setDescription("Search for a Monster Mod and its Details").setRequired(true))



const url = `https://poswebapiservice.azurewebsites.net/api/MonsterMod/Name?name=`

class mobdata {
    "id": number;
    "modName": string;
    "modEffects": string

    constructor(userResponse: any) {
        this.id = userResponse.id;
        this.modName = userResponse.modName;
        this.modEffects = userResponse.modEffects;
    }
    }


export async function execute(interaction: CommandInteraction, client: Client){
    if(!interaction?.channelId){
        return
    }
    const channel = await client.channels.fetch(interaction.channelId)
    if(!channel || channel.type != "GUILD_TEXT"){
        return
    }

    const mName = interaction.options.getString("mod")
    const {user} = interaction;
    const res = await fetch(url+mName) .then(res => res.json()) .then(res => res as mobdata);


    console.log(res.modName);
    console.log(res.modEffects);


    return interaction.reply({

        content: res.modName + "\n" + res.modEffects,
        ephemeral: false,
    })
}