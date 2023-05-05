import { CommandDefinition } from "../../handlers/handleCommands";
import { EmbedBuilder } from "discord.js";

export default new CommandDefinition({
    name: "botinfo",
    description: "This shows information about the bot",
    execute: async ({ interaction, client }) => {
        const name = "SpaceBot";
        const icon = `${client.user.displayAvatarURL()}`;
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes & ${seconds} seconds`;

        let ping = `${Date.now() - interaction.createdTimestamp}ms`;

        const embed = new EmbedBuilder()
        .setColor(`#3342AE`)
        .setAuthor({name: name, iconURL: icon})
        .setThumbnail(`${icon}`)
        .setFooter({text: `Bot ID: 1102646143927722135`})
        .addFields(
            {name: "Server Numbers", value: `${client.guilds.cache.size}`, inline: true},
            {name: "Server Members", value: `${servercount}`, inline: true},
            {name: "Latency", value: `${ping}`, inline: true},
            {name: "Uptime", value: `\`\`\`${uptime}\`\`\``}
        )

        interaction.followUp({embeds: [embed]})
    }
});
