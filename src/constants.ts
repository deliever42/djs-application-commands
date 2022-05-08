import type { PermissionFlagsBits, Snowflake } from 'discord-api-types';

export enum ApplicationCommandOptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11,
}

export enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
}

export enum ApplicationCommandTypes {
    SLASH_COMMAND = 1,
    USER_CONTEXT_MENU = 2,
    MESSAGE_CONTEXT_MENU = 3,
}

export interface ApplicationCommandOptionChoiceData {
    name: string;
    nameLocalizations?: { [locale: string]: string };
    value: string | number;
}

export interface ApplicationCommandOptionChoiceData {
    name: string;
    nameLocalizations?: { [locale: string]: string };
    value: string | number;
}

export interface ApplicationCommandOptionData {
    name: string;
    type: keyof typeof ApplicationCommandOptionTypes;
    nameLocalizations?: { [locale: string]: string };
    description: string;
    descriptionLocalizations?: { [locale: string]: string };
    required?: boolean;
    choices?: ApplicationCommandOptionChoiceData[];
    options?: ApplicationCommandOptionData[];
    channelTypes?: (keyof typeof ChannelTypes)[];
    minValue?: number;
    maxValue?: number;
    autocomplete?: boolean;
}

export interface ApplicationCommandData {
    name: string;
    nameLocalizations?: { [locale: string]: string };
    description?: string;
    descriptionLocalizations?: { [locale: string]: string };
    type?: keyof typeof ApplicationCommandTypes;
    options?: ApplicationCommandOptionData[];
    permissions?: keyof typeof PermissionFlagsBits | (keyof typeof PermissionFlagsBits)[];
    global?: boolean;
    guildId?: Snowflake
}
