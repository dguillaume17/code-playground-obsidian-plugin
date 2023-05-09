import { CodeFile } from "src/models/code-file.model";

export class BlockExtractorService {

    // Interface

    public extractCodeFilesFrom(blockSource: string): CodeFile[] {
        const matches = blockSource.matchAll(/BEGIN--(.*?)--(.*?)END--(.*?)--/gs);
        const codeFiles = new Array<CodeFile>();

        for (const match of matches) {
            const fileName = match[1];
            const code = match[2].trim();

            const codeFile = new CodeFile({
                code: code,
                fileName: fileName
            });

            codeFiles.push(codeFile);
        }

        return codeFiles;
    }

}