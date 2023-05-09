import { CodeFile } from "src/models/code-file.model";

export enum CodeLanguage {
    Html,
    Text,
    TypeScript
}

export namespace CodeLanguage {

    export function getAll(): CodeLanguage[] {
        return [ // TODO
            CodeLanguage.Html,
            CodeLanguage.Text,
            CodeLanguage.TypeScript
        ];
    }

    export function fromFileExtension(fileExtension: string): CodeLanguage {
        const nullableFileExtension = getAll().find(codeLanguage => {
            return getFileExtension(codeLanguage) === fileExtension;
        });

        return nullableFileExtension ?? CodeLanguage.Text;
    }

    export function getFileExtension(codeLanguage: CodeLanguage | undefined): string {
        switch (codeLanguage) {
            case CodeLanguage.Html:
                return '.html';
            case CodeLanguage.Text:
                return '.txt';
            case CodeLanguage.TypeScript:
                return '.ts';
            default:
                return '.txt';
        }
    }

    export function getMarkdownCodeBlockLanguage(codeLanguage: CodeLanguage | undefined): string {
        switch (codeLanguage) {
            case CodeLanguage.Html:
                return 'html';
            case CodeLanguage.TypeScript:
                return 'typescript';
            case CodeLanguage.Text:
            default:
                return 'text';
        }    
    }

}