import { BaseOption } from "./Base"

export class AttachmentOptionBuilder extends BaseOption {
    public required: boolean
    public constructor() {
        super("ATTACHMENT")

        this.required = false
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }
}