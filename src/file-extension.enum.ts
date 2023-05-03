export enum FileExtension {
    Html = 'html',
    Json = 'json',
    Markdown = 'md',
    Text = 'txt',
    Typescript = 'ts'
}

export namespace FileExtension {

    export function getAll(): FileExtension[] {
        return [
            FileExtension.Html,
            FileExtension.Json,
            FileExtension.Markdown,
            FileExtension.Text,
            FileExtension.Typescript
        ];
    }

    export function getDefaultFileExtension(): FileExtension {
        return FileExtension.Text;
    }

    export function find(rawFileExtension: string): FileExtension | undefined {
        return getAll().find(fileExtension => fileExtension === rawFileExtension);
    }

    export function getAssociatedMarkdownLanguage(extension: FileExtension): string {
        switch (extension) {
            case FileExtension.Html:
            case FileExtension.Json:
                return extension.toString();
            case FileExtension.Markdown:
                return 'markdown';
            case FileExtension.Typescript:
                return 'typescript';
            default:
                return '';
        }
    }
}