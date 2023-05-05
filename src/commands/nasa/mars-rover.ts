import { CommandDefinition } from "../../handlers/handleCommands";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

const MARS_ROVER_API_KEY = process.env.NASA_API_KEY;

export default new CommandDefinition({
    name: "mars-rover",
    description: "Displays the latest photo taken by the Mars Rover",
    execute: async ({ interaction }) => {
        try {
            const response = await axios.get(
              `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${MARS_ROVER_API_KEY}`
            );
      
            const { img_src, earth_date, rover } = response.data.latest_photos[0];
      
            const embed = new EmbedBuilder()
            .setTitle(`Latest Photo from the ${rover.name} Rover on Mars`)
            .setColor("DarkRed")
            .setImage(img_src)
            .setDescription(`Taken on ${earth_date}`)
            .setFooter({text: "Provided by NASA's Mars Rover API"});
      
            await interaction.followUp({ embeds: [embed] });
          } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred while fetching the photo :(");
          }
    }
});
