import { CommandInteractionOptionResolver, TextChannel } from "discord.js";
import { client } from "..";
import { Event } from "../handlers/handleEvents";
import { ExtendedInteraction } from "../lib/typeCommand";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non existent command");

        command.execute({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });

        if (interaction.isCommand() && interaction.commandName === "remind") {

            const remindSchema = require("../lib/schemas/remindSchema");

            setInterval(async () => {
              const reminders = await remindSchema.find();

              if (!reminders) return;
              else {
                reminders.forEach(async (reminder: any) => {

                  if (reminder.Time > Date.now()) return;
                  const user = await client.users.fetch(reminder.User);

                  const channel = await interaction.guild?.channels.fetch(reminder.Channel) as TextChannel;

                  if (!channel) return;

                  user?.send({
                    content: `${user}, you asked to reminded about: \`${reminder.Remind}\``
                  }).catch (err => {return;});

                  channel.send({
                    content: `${user}, you asked to reminded about: \`${reminder.Remind}\`. In case you do not notice this reminder, I have also sent you a DM!`
                  })

                  await remindSchema.deleteMany({
                    Time: reminder.Time,
                    User: user.id,
                    Remind: reminder.Remind,
                    Channel: channel.id
                  });

                });

              }

            }, 1000 * 5);
        }
    }
});
