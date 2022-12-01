import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction, TextChannel} from "discord.js";
import {parseResponse} from "@discordjs/rest";
import {mmURL} from "./urlstash";


//define command
export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Monster Mod Help").addStringOption(option => option
        .setName("mod")
        .setDescription("Search for a Monster Mod and its Details")
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

    const reply = interaction.options.getString("mod")
    const {user} = interaction;
    //pre "reply" work

    //Send Msg Back
    return interaction.reply({

        content: "string here",
        ephemeral: false,
    })
}