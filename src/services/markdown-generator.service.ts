import { MarkdownRenderer, Plugin } from "obsidian";
import { CodeLanguage } from "src/enums/code-language.enum";
import { CodeFile } from "src/models/code-file.model";

export class MarkdownGeneratorService {

    // LIfecycle

    constructor(
        private _plugin: Plugin
    ) {

    }


    // Interface

    public renderCodeBlockFor(codeFile: CodeFile, el: HTMLElement) {
		const delimiter = '```';
		const markdown = `*${codeFile.fileName}*\n` +
                            `${delimiter}${codeFile.markdownCodeBlockLanguage}\n` +
                            `${codeFile.code}\n` +
                            `${delimiter}\n`;

        console.log(markdown);

        MarkdownRenderer.renderMarkdown(markdown, el, '', this._plugin);
	}
}