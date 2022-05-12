import { BaseOptionBuilder } from "./Base"

export class MentionableOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public constructor() {
        super("MENTIONABLE")

        this.required = false
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }
}