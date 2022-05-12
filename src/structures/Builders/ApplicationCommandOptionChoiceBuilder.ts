export class ChoiceBuilder {
    public name: string | null;
    public name_localizations: { [locale: string]: string }
    public value: string | number | null
    public constructor() {
        this.name = null
        this.value = null
        this.name_localizations = {}
    }

    public setName(name: string) {
        this.name = name
        return this
    }

    public setValue(value: string | number) {
        this.value = value
        return this
    }

    public setNameLocalizations(localizations: { [locale: string]: string }) {
        this.name_localizations = localizations;
        return this
    }

    public toJSON(): { [property: string]: any } {
        return [...[this]][0]
    }
}
