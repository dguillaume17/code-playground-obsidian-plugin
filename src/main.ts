import { MarkdownRenderer, Plugin } from 'obsidian';
import * as Diff2Html from 'diff2html';
import { LineType } from 'diff2html/lib/types';
import { DataviewApi, getAPI } from "obsidian-dataview";
import { FileExtension } from './file-extension.enum';
import { MarkUtils } from './mark.utils';
import { Constants } from './constants';

// https://blacksmithgu.github.io/obsidian-dataview/resources/develop-against-dataview/

export default class MyPlugin extends Plugin {

    // Inner properties

    private _dataviewApi: DataviewApi | undefined;

	// Lifecycle

	async onload() {

        this.setupDataViewApi();

        this.registerMarkdownCodeBlockProcessor(
			'code-playground-summary',
			(source, el, ctx) => {
				this.loadSummary();
			}
		);

		this.registerMarkdownCodeBlockProcessor(
			'code-playground-mark',
			(source, el, ctx) => {
                if (this._dataviewApi == null) {
                    return;
                }

                console.log(ctx.sourcePath);
                const currentPage = this._dataviewApi.page(ctx.sourcePath);
                if (currentPage == null) {
                    return;
                }
                const mark = currentPage[Constants.MARK];
                console.log(mark);
				this.loadRepository(el);
			}
		);

	}

	onunload() {

	}

    // Setup

    private setupDataViewApi() {
        this._dataviewApi = getAPI(this.app);

        if (this._dataviewApi == null) {
            // TODO GDER
            alert('Please install DataView plugin');
            return;
        }
    }

	// Inner work

	private async loadRepository(el: HTMLElement) {
        const repositoryPath = 'https://github.com/dguillaume17/angular-playground/compare/base...master.diff';
		await fetch(repositoryPath)
			.then(response => {
				return response.text();
			})
			.then(text => {
				const diffFiles = Diff2Html.parse(text);
				const markdown = diffFiles.reduce((markdown, diffFile) => {
					const code = diffFile.blocks.reduce((code, block) => {
						const lines = block.lines.reduce((lines, currentLine) => {
                            const shouldSkipLine = currentLine.type === LineType.DELETE;
							if (shouldSkipLine) {
								return lines;
							}

                            const cleanedCurrentLine = currentLine.content.substring(1);
							return lines + cleanedCurrentLine + '\n';
						}, '');

						return code + lines;
					}, '');

					if (code.length === 0) {
						return markdown;
					}

					const fileName = diffFile.newName;
					const rawFileExtension = fileName.split('.').pop() ?? '';
                    const fileExtension = FileExtension.find(rawFileExtension) ?? FileExtension.getDefaultFileExtension();
					const markdownLanguage = FileExtension.getAssociatedMarkdownLanguage(fileExtension);

					if (MarkUtils.isSummaryFileName(fileName)) {
						console.log('readme', code);
					}

					if (!MarkUtils.hasMark(1, code)) {
						return markdown;
					}

					const markdownCodeBlock = this.generateMarkdownCodeBlock(markdownLanguage, code);
					return `${markdown}\n\`${fileName}\`\n${markdownCodeBlock}`;
				}, '');

				MarkdownRenderer.renderMarkdown(markdown, el, '', this);
			});
	}

    private loadSummary() {
        if (this._dataviewApi == null) {
            return;
        }

        const pages = this._dataviewApi.pages().where(w => w[Constants.MARK] != null);

        console.log(this._dataviewApi.array(pages).array());
    }

	private generateMarkdownCodeBlock(language: string, code: string) {
		const delimiter = '```';
		return `${delimiter}${language}\n${code}\n${delimiter}`;
	}
}
