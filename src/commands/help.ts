import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction, TextChannel} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help Ticket").addStringOption(option => option.setName("description").setDescription("Describe problem").setRequired(true))

export async function execute(interaction: CommandInteraction, client: Client){
    if(!interaction?.channelId){
        return
    }
    const channel = await client.channels.fetch(interaction.channelId)
    if(!channel || channel.type != "GUILD_TEXT"){
        return
    }
    const thread = await (channel as TextChannel).threads.create({
        name:`support=${Date.now()}`,
        reason: `Sup. ticket ${Date.now()} `
    })

    const problemDescription = interaction.options.getString("description")
    const {user} = interaction;
    thread.send(`**User:** <@${user}> **Problem:** ${problemDescription}`)

    return interaction.reply({
        content:"Thank you for the input!",
        ephemeral: true,
    })
}