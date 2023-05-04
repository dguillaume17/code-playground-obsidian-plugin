export class MarkType {

    // Model properties

    public name: string;

    public value: string;

    // Lifecycle

    constructor(fields: {
        name: string,
        value: string
    }) {
        Object.assign(this, fields);
    }
}