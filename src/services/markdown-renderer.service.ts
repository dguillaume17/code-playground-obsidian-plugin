import { MarkdownRenderer, Plugin } from "obsidian";
import { CodeFile } from "src/models/code-file.model";

export class MarkdownRendererService {

    // LIfecycle

    constructor(
        private _plugin: Plugin
    ) {}


    // Interface

    public renderCodeBlockFor(codeFile: CodeFile, el: HTMLElement) {
		const delimiter = '```';
		const markdown = `*${codeFile.fileName}*\n` +
                            `${delimiter}${codeFile.markdownCodeBlockLanguage}\n` +
                            `${codeFile.code}\n` +
                            `${delimiter}\n`;

        MarkdownRenderer.renderMarkdown(markdown, el, '', this._plugin);
	}
}