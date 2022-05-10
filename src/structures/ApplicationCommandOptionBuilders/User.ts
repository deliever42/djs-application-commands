import { BaseOption } from "./Base"

export class UserOptionBuilder extends BaseOption {
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