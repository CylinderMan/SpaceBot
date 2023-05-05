import {model, Schema} from "mongoose";

let reminderSchema = new Schema({
    User: String,
    Time: String,
    Remind: String,
    Channel: String,
});

module.exports = model("rSch", reminderSchema);