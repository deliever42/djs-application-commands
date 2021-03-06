export enum Permissions {
    CREATE_INSTANT_INVITE = 1 << 0,
    KICK_MEMBERS = 1 << 1,
    BAN_MEMBERS = 1 << 2,
    ADMINISTRATOR = 1 << 3,
    MANAGE_CHANNELS = 1 << 4,
    MANAGE_GUILD = 1 << 5,
    ADD_REACTIONS = 1 << 6,
    VIEW_AUDIT_LOG = 1 << 7,
    PRIORITY_SPEAKER = 1 << 8,
    STREAM = 1 << 9,
    VIEW_CHANNEL = 1 << 10,
    SEND_MESSAGES = 1 << 11,
    SEND_TTS_MESSAGES = 1 << 12,
    MANAGE_MESSAGES = 1 << 13,
    EMBED_LINKS = 1 << 14,
    ATTACH_FILES = 1 << 15,
    READ_MESSAGE_HISTORY = 1 << 16,
    MENTION_EVERYONE = 1 << 17,
    USE_EXTERNAL_EMOJIS = 1 << 18,
    VIEW_GUILD_INSIGHTS = 1 << 19,
    CONNECT = 1 << 20,
    SPEAK = 1 << 21,
    MUTE_MEMBERS = 1 << 22,
    DEAFEN_MEMBERS = 1 << 23,
    MOVE_MEMBERS = 1 << 24,
    USE_VAD = 1 << 25,
    CHANGE_NICKNAME = 1 << 26,
    MANAGE_NICKNAMES = 1 << 27,
    MANAGE_ROLES = 1 << 28,
    MANAGE_WEBHOOKS = 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
    USE_APPLICATION_COMMANDS = 1 << 31,
    REQUEST_TO_SPEAK = 1 << 32,
    MANAGE_EVENTS = 1 << 33,
    MANAGE_THREADS = 1 << 34,
    CREATE_PUBLIC_THREADS = 1 << 35,
    CREATE_PRIVATE_THREADS = 1 << 36,
    USE_EXTERNAL_STICKERS = 1 << 37,
    SEND_MESSAGES_IN_THREADS = 1 << 38,
    USE_EMBEDDED_ACTIVITIES = 1 << 39,
    MODERATE_MEMBERS = 1 << 40
}

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
    permissions?: keyof typeof Permissions | (keyof typeof Permissions)[];
    global?: boolean;
    guildId?: Snowflake
}

export interface RawApplicationCommandOptionChoiceData {
    name: string
    name_localizations?: { [locale: string]: string };
    value: string | number
}

export interface RawApplicationCommandOptionData {
    type: number
    name: string
    name_localizations?: { [locale: string]: string };
    description: string
    description_localizations?: { [locale: string]: string };
    required?: boolean
    choices?: RawApplicationCommandOptionChoiceData[]
    options?: RawApplicationCommandOptionData[]
    channel_types?: number[]
    min_value?: number
    max_value?: number
    autocomplete?: boolean
}

export interface RawApplicationCommandData {
    id: Snowflake
    type?: number
    application_id: Snowflake
    guild_id?: Snowflake
    name: string
    name_localizations?: { [locale: string]: string };
    description?: string
    description_localizations?: { [locale: string]: string };
    options?: RawApplicationCommandOptionData[]
    default_member_permissions?: string
    dm_permission?: boolean
    version: Snowflake
}

export interface ApplicationCommandEditData {
    name?: string;
    nameLocalizations?: { [locale: string]: string };
    description?: string;
    descriptionLocalizations?: { [locale: string]: string };
    type?: keyof typeof ApplicationCommandTypes;
    options?: ApplicationCommandOptionData[];
    permissions?: keyof typeof Permissions | (keyof typeof Permissions)[];
    global?: boolean;
    guildId?: Snowflake
}

export type Snowflake = string