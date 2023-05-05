require("dotenv").config();
import { ExtendedClient } from "./handlers/handleClient";

export const client = new ExtendedClient();

client.start();