import { CodeLanguage } from "src/enums/code-language.enum";
import { CodeFileFields } from "./code-file-fields.interface";

export class CodeFile implements CodeFileFields {

    // Model properties

    public code: string;

    public fileName: string;

    public language: CodeLanguage;

    // Calculated properties

    public get markdownCodeBlockLanguage(): string {
        return CodeLanguage.getMarkdownCodeBlockLanguage(this.language);
    }

    // Lifecycle

    constructor(fields: CodeFileFields) {
        Object.assign(this, fields);
    }
}