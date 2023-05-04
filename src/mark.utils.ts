export namespace MarkUtils {

    export function extractShortMarkIndex(shortMark: string): number | null {
        const regexp = /(MARK-)([0-9]+)(-)/;
        if (!shortMark.match(regexp)) {
            return null;
        }

        return Number(shortMark.replace(regexp, '$2'));
    }

    export function isSummaryFileName(fileName: string): boolean {
        return fileName.toLowerCase() === 'readme.md';
    }
}