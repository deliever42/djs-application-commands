import { BaseOption } from "./Base"

export class MentionableOptionBuilder extends BaseOption {
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