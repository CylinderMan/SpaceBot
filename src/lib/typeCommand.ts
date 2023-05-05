import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from "discord.js";
import { ExtendedClient } from "../handlers/handleClient";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface executeOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type executeFunction = (options: executeOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    execute: executeFunction;
} & ChatInputApplicationCommandData;
