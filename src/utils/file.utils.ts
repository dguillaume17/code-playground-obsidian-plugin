export namespace FileUtils {

    export function castFileNameAsFileExtension(fileName: string): string {
        const lastPart = fileName.split('.').pop();

        return lastPart == null
            ? ''
            : `.${lastPart}`;
    }

}