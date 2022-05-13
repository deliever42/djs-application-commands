export class Base {
    public toJSON(): { [property: string]: any } {
        return [...[this]][0]
    }
}