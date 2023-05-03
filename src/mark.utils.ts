export namespace MarkUtils {

    export function getMark(index: number): string {
        return `MARK-${index}-`;
    }

    export function hasMark(index: number, code: string): boolean {
        const mark = getMark(index);
        return code.contains(mark);
    }

    export function isSummaryFileName(fileName: string): boolean {
        return fileName.toLowerCase() === 'readme.md';
    }
}