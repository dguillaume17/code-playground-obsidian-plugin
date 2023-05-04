import { FileExtension } from "src/file-extension.enum";

export class CodeFile {

    // Model properties

    public fileName: string;

    public fileExtension: FileExtension;

    public content: string;

    // Calculated properties

    public get associatedMarkdownLanguage(): string {
        return FileExtension.getAssociatedMarkdownLanguage(this.fileExtension);
    }

    public get isSummaryFile(): boolean {
        return this.fileName.toLowerCase() === 'readme.md';
    }

    // Lifecycle

    constructor(fields: {
        fileName: string,
        fileExtension: FileExtension,
        content: string
    }) {
        Object.assign(this, fields);
    }

}