import { BaseOptionBuilder } from "./Base"

export class BooleanOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public constructor() {
        super("BOOLEAN")

        this.required = false
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }
}