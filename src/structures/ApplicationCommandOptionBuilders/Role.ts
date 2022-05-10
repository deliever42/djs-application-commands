import { BaseOption } from "./Base"

export class RoleOptionBuilder extends BaseOption {
    public required: boolean
    public constructor() {
        super("ROLE")

        this.required = false
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }
}