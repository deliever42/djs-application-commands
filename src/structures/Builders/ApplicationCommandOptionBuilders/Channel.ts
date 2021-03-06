import { BaseOptionBuilder } from "./Base"
import { ChannelTypes } from "../../../index"

export class ChannelOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public channel_types: number[] | null
    public constructor() {
        super("CHANNEL")

        this.required = false
        this.channel_types = null
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }

    public setChannelTypes(channelTypes: (keyof typeof ChannelTypes)[]) {
        this.channel_types = channelTypes.map((type) => ChannelTypes[type]) as unknown as number[]
        return this
    }
}