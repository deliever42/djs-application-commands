import { ApplicationCommandOptionTypes } from "../../index"

export class BaseOption {
    public name: string | null
    public description: string | null
    public type: number
    public constructor(type: keyof typeof ApplicationCommandOptionTypes) {
        this.name = null
        this.description = null
        this.type = ApplicationCommandOptionTypes[type]
    }

    public setName(name: string) {
        this.name = name
        return this
    }

    public setDescription(description: string) {
        this.description = description
        return this
    }
}