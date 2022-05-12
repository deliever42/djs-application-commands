import { BaseOptionBuilder } from "./Base"
import type { ApplicationCommandOptionChoiceData, RawApplicationCommandOptionChoiceData } from "../../../index"
import { ChoiceBuilder } from "../ApplicationCommandOptionChoiceBuilder"

export class StringOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public autocomplete: boolean
    public choices: RawApplicationCommandOptionChoiceData[]
    public constructor() {
        super("STRING")

        this.required = false
        this.autocomplete = false
        this.choices = []
    }

    public setRequired(required: boolean) {
        this.required = required
        return this
    }

    public setAutocomplete(autocomplete: boolean) {
        this.autocomplete = autocomplete
        return this
    }

    public addChoice(fn: (builder: ChoiceBuilder) => void) {
        const builder = new ChoiceBuilder()

        fn(builder)

        this.choices.push(builder.toJSON() as RawApplicationCommandOptionChoiceData)
        return this
    }

    public addChoices(...fn: ((builder: ChoiceBuilder) => void)[]) {
        for (const cfn of fn) {
            this.addChoice(cfn)
        }

        return this
    }
}