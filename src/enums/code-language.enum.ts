export enum CodeLanguage {
    TypeScript
}

export namespace CodeLanguage {

    export function getMarkdownCodeBlockLanguage(codeLanguage: CodeLanguage | undefined): string {
        switch (codeLanguage) {
            case CodeLanguage.TypeScript:
                return 'typescript';
            default:
                return 'text';
        }    
    }

}