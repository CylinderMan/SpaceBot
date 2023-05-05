import { CommandDefinition } from "../../handlers/handleCommands";
import { EmbedBuilder, ApplicationCommandOptionType, CommandInteractionOption } from "discord.js";

export default new CommandDefinition({
    name: "find",
    description: "Search for an object in the solar system.",
    options: [
        {
          name: "object",
          description: "The object you want to search for.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
    ],
    execute: async ({ interaction, client }) => {
        const objectOption = interaction.options.get("object") as CommandInteractionOption;
        const query = objectOption.value as string;

        
    }
});
