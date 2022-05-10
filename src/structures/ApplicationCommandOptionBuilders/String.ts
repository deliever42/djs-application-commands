import { BaseOption } from "./Base"
import type { ApplicationCommandOptionChoiceData, RawApplicationCommandOptionChoiceData } from "../../index"

export class StringOptionBuilder extends BaseOption {
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

    public addChoice(choice: ApplicationCommandOptionChoiceData) {
        const resolvedChoice = this.resolveCommandOptionChoice(choice)

        this.choices.push(resolvedChoice)
        return this
    }

    public addChoices(...choices: ApplicationCommandOptionChoiceData[]) {
        for (const choice of choices) {
            this.addChoice(choice)
        }

        return this
    }

    private resolveCommandOptionChoice(choice: ApplicationCommandOptionChoiceData): RawApplicationCommandOptionChoiceData {
        return { name: choice.name, name_localizations: choice.nameLocalizations ?? null, value: choice.value } as unknown as RawApplicationCommandOptionChoiceData
    }
}