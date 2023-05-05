import { CommandDefinition } from "../../handlers/handleCommands";

export default new CommandDefinition({
    name: "ping",
    description: "Check the bot's latency",
    execute: async ({ interaction, client }) => {
        interaction.followUp({content: `:ping_pong: Pong! Your current ping is at a whopping **${client.ws.ping}**ms!`})
    }
});
