import { BaseOptionBuilder } from "./Base"

export class UserOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public constructor() {
        super("USER")

        this.required = false
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }
}