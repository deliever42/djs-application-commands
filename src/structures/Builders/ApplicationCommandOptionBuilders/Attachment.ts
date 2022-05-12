import { BaseOptionBuilder } from "./Base"

export class AttachmentOptionBuilder extends BaseOptionBuilder {
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