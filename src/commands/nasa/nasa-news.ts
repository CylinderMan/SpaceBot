import { CommandDefinition } from "../../handlers/handleCommands";
import { EmbedBuilder } from "discord.js";

async function fetchNews(): Promise<any> {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    return response.json();
  }

export default new CommandDefinition({
    name: "nasa-news",
    description: "Get the latest news from the NASA news API",
    execute: async ({ interaction, client }) => {
        try {
            const data = await fetchNews();
            const embed = new EmbedBuilder()
              .setColor("#0d6efd")
              .setTitle(data.title)
              .setDescription(data.explanation)
              .setImage(data.url)
              .setFooter({text: `Published on ${data.date}`})
            interaction.followUp({ embeds: [embed] });
          } catch (error) {
            console.error(error);
            interaction.followUp("Failed to fetch news from NASA API.");
          }
    }
});