import { CommandDefinition } from "../../handlers/handleCommands";
import axios from "axios";

export default new CommandDefinition({
    name: "apod",
    description: "Get a random astronomy picture from NASA",
    execute: async ({ interaction, client }) => {
        try {
            const response = await axios.get("https://api.nasa.gov/planetary/apod", {
                params: {
                    api_key: process.env.NASA_API_KEY,
                    count: 1,
                },
            });
            const data = response.data[0];
            const embed = {
                title: data.title,
                url: data.hdurl,
                description: data.explanation,
                image: {
                    url: data.url,
                },
                timestamp: new Date().toISOString(),
                footer: {
                    text: "Provided by NASA API",
                    icon_url: "https://www.nasa.gov/sites/default/files/images/nasaLogo-570x450.png",
                },
            };
            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred while fetching the picture :(");
        }
    }
});
