import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction, TextChannel} from "discord.js";
import {parseResponse} from "@discordjs/rest";
import {mmURL} from "./urlstash";

//define command
export const data = new SlashCommandBuilder()
    .setName("randomroll")
    .setDescription("Rolls a given # of dice 0~100").addStringOption(option => option
        .setName("amount")
        .setDescription("Number of dice to roll")
        .setRequired(true))


//run command
export async function execute(interaction: CommandInteraction, client: Client) {
    if (!interaction?.channelId) {
        return
    }
    const channel = await client.channels.fetch(interaction.channelId)
    if (!channel || channel.type != "GUILD_TEXT") {
        return
    }
    // Values to use in command


    const {user} = interaction;

    let dice:number = 1;
    try{
        let reply:string|null = interaction.options.getString("amount")
        if (reply != null){
             dice = parseInt(reply);
             if(Number.isNaN(dice)){
                 dice = 1;
             }
        }
        else{
             dice = 1;
        }
    }
    catch (error){
         dice = 1;
    }
    let msg:string = '';
    if(dice > 20){
        dice = 20;
        msg += `Max dice allowed is 20 right now. Im looking at you ${user}. \n`
    }
    let dicearray = new Array<number>(dice);
    //pre "reply" work
    for(let x: number = 0; x < dicearray.length;x++){
        dicearray[x] = Math.floor(Math.random() * 100);
        msg += dicearray[x].toString();
        if(x != dicearray.length -1){
            msg += ", ";
        }
    }


    //Send Msg Back
    return interaction.reply({

        content: msg,
        ephemeral: false,
    })
}