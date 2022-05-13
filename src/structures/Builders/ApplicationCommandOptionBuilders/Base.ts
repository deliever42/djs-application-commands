import { ApplicationCommandOptionTypes } from "../../../index"
import { Base } from "../../Base"

export class BaseOptionBuilder extends Base {
    public name: string | null
    public description: string | null
    public type: number
    public name_localizations: { [locale: string]: string }
    public description_localizations: { [locale: string]: string }
    public constructor(type: keyof typeof ApplicationCommandOptionTypes) {
        super()

        this.name = null
        this.description = null
        this.type = ApplicationCommandOptionTypes[type]
        this.name_localizations = {}
        this.description_localizations = {}
    }

    public setName(name: string) {
        this.name = name
        return this
    }

    public setDescription(description: string) {
        this.description = description
        return this
    }

    public setNameLocalizations(localizations: { [locale: string]: string }) {
        this.name_localizations = localizations
        return this
    }

    public setDescriptionLocalizations(localizations: { [locale: string]: string }) {
        this.description_localizations = localizations
        return this
    }
}