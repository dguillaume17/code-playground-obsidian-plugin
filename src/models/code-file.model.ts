import { CodeLanguage } from "src/enums/code-language.enum";
import { CodeFileFields } from "./code-file-fields.interface";
import { FileUtils } from "src/utils/file.utils";

export class CodeFile implements CodeFileFields {

    // Model properties

    public code: string;

    public fileName: string;

    // Calculated properties

    public get fileExtension(): string {
        return FileUtils.castFileNameAsFileExtension(this.fileName);
    }

    public get language(): CodeLanguage {
        return CodeLanguage.fromFileExtension(this.fileExtension);
    }

    public get markdownCodeBlockLanguage(): string {
        return CodeLanguage.getMarkdownCodeBlockLanguage(this.language);
    }

    // Lifecycle

    constructor(fields: CodeFileFields) {
        Object.assign(this, fields);
    }

    // Interface

    public isEqualsTo(codeFile: CodeFile): boolean {
        return this.fileName === codeFile.fileName;
    }
}