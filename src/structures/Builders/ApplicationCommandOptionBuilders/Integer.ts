import { BaseOptionBuilder } from "./Base"
import type { ApplicationCommandOptionChoiceData, RawApplicationCommandOptionChoiceData } from "../../../index"
import { ChoiceBuilder } from "../ApplicationCommandOptionChoiceBuilder"

export class IntegerOptionBuilder extends BaseOptionBuilder {
    public required: boolean
    public autocomplete: boolean
    public choices: RawApplicationCommandOptionChoiceData[]
    public max_value: number | null
    public min_value: number | null
    public constructor() {
        super("INTEGER")

        this.required = false
        this.autocomplete = false
        this.choices = []
        this.max_value = null
        this.min_value = null
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

    public setMaxValue(maxValue: number) {
        this.max_value = maxValue
        return this
    }

    public setMinValue(minValue: number) {
        this.min_value = minValue
        return this
    }
}