import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { DataViewPluginService } from './services/data-view-plugin.service';
import { MarkdownGeneratorService } from './services/markdown-generator.service';
import { CodeFile } from './models/code-file.model';
import { CodeLanguage } from './enums/code-language.enum';

export default class CodePlaygroundPlugin extends Plugin {

    // Inner properties

    private _dataViewPluginService: DataViewPluginService | undefined;
    private _markdownGeneratorService: MarkdownGeneratorService | undefined;
	
    // Lifecycle

	public async onload() {
        this.setupServices();
        console.log('onload');

        this.setupCodePlaygroundProcessor();
	}

	public onunload() {

	}

    // Inner work

    private setupServices() {
        this._dataViewPluginService = new DataViewPluginService(this.app);
        this._markdownGeneratorService = new MarkdownGeneratorService();
    }

    private setupCodePlaygroundProcessor() {
        this.registerMarkdownCodeBlockProcessor(
			'code-playground',
			(source, el, ctx) => {
                const matches = source.matchAll(/BEGIN--(.*?)--(.*?)END--(.*?)--/gs);

                for (const match of matches) {
                    const fileName = match[1];
                    const code = match[2].trim();

                    const codeFile = new CodeFile({
                        code: code,
                        fileName: fileName,
                        language: CodeLanguage.TypeScript
                    });
                    
                    this._markdownGeneratorService?.renderCodeBlockFor(codeFile, el);
                }
            }
        );
    }
}
