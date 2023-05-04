import { MarkdownRenderer, Plugin } from 'obsidian';
import * as Diff2Html from 'diff2html';
import { LineType } from 'diff2html/lib/types';
import { DataviewApi, getAPI } from "obsidian-dataview";
import { FileExtension } from './file-extension.enum';
import { MarkUtils } from './mark.utils';
import { Constants } from './constants';
import { Mark } from './models/mark.model';

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

                const currentPage = this._dataviewApi.page(ctx.sourcePath);
                if (currentPage == null) {
                    return;
                }
                const currentLongTextMark = currentPage[Constants.OBSIDIAN_LONG_MARK_FIELD];
				this.loadRepository(el, currentLongTextMark);
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

	private async loadRepository(el: HTMLElement, currentLongTextMark: string) {
		await fetch(Constants.GIT_DIFF_PATH)
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
                        code.split('\n').forEach(rawMark => {
                            if (rawMark.trim().length === 0) {
                                return;
                            }
                            const mark = Mark.fromConfigurationMark(rawMark);
                            console.log(rawMark, mark);
                        });
					}

					if (!code.contains(currentLongTextMark)) {
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

        const pages = this._dataviewApi.pages().where(w => w[Constants.OBSIDIAN_LONG_MARK_FIELD] != null);

        console.log(this._dataviewApi.array(pages).array());
    }

	private generateMarkdownCodeBlock(language: string, code: string) {
		const delimiter = '```';
		return `${delimiter}${language}\n${code}\n${delimiter}`;
	}
}
