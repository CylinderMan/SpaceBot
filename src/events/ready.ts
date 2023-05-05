import { Event } from "../handlers/handleEvents";
import { ActivityType } from "discord.js";
import { connect } from "mongoose";

export default new Event("ready", (client) => {
    client.user.setActivity(`the universe expand`, {type: ActivityType.Watching})
    console.log("The bot is online!")

    try {
        connect(process.env.MONGO_DB_URL, {
        serverSelectionTimeoutMS: 3000
        });
        console.log("MongoDB connection successful");
      } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
      }
});
