import { CommandDefinition } from "../../handlers/handleCommands";
import { EmbedBuilder, ApplicationCommandOptionType, GuildChannel } from "discord.js";
const remindSchema = require("../../lib/schemas/remindSchema");

export default new CommandDefinition({
    name: "remind",
    description: "Set a reminder for yourself",
    options: [
        {
            name: "set",
            description: "Set a reminder",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Which channel do you want to be reminded in?",
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: "reminder",
                    description: "What do you want to be reminded of?",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "minutes",
                    description: "How many minutes from now?",
                    type: ApplicationCommandOptionType.Integer,
                    min_value: 0,
                    max_value: 59,
                    required: true,
                },
                {
                    name: "hours",
                    description: "How many hours from now?",
                    type: ApplicationCommandOptionType.Integer,
                    min_value: 0,
                    max_value: 23,
                    required: false,
                },
                {
                    name: "day",
                    description: "How many days from now?",
                    type: ApplicationCommandOptionType.Integer,
                    min_value: 1,
                    max_value: 31,
                    required: false,
                },
            ],
        },
    ],
    execute: async ({ interaction, client }) => {
        const {options, guild} = interaction;

        const reminder = options.get("reminder").value as string;

        const hourOption = options.get("hours");
        const minuteOption = options.get("minutes");
        const dayOption = options.get("day");

        const hour = hourOption ? hourOption.value as number || 0 : 0;
        const minute = minuteOption ? minuteOption.value as number || 0 : 0;
        const day = dayOption ? dayOption.value as number || 0 : 0;

        const channel = options.get("channel").channel as GuildChannel;

        let time = Date.now() + (day * 1000 * 60 * 60 * 24) + (hour * 1000 * 60 * 60) + (minute * 1000 * 60);

        await remindSchema.create({
            User: interaction.user.id,
            Time: time,
            Remind: reminder,
            Channel: channel.id
        });

        const embed = new EmbedBuilder()
        .setColor(`#3342AE`)
        .setDescription(`📩 Your reminder system has been set for <t:${Math.floor(time/1000)}:R> I will remind you about "${reminder}" in ${channel}`);

        await interaction.followUp({embeds: [embed]});
    }
});
