import { Plugin } from 'obsidian';
import { DataViewPluginService } from './services/data-view-plugin.service';
import { MarkdownGeneratorService } from './services/markdown-generator.service';
import { CodeFile } from './models/code-file.model';
import { BlockExtractorService } from './services/block-extractor.service';

export default class CodePlaygroundPlugin extends Plugin {

    // Inner properties

    private _blockExtractorService: BlockExtractorService; 
    private _dataViewPluginService: DataViewPluginService | undefined;
    private _markdownGeneratorService: MarkdownGeneratorService | undefined;
	
    // Lifecycle

	public async onload() {
        this.setupServices();

        this.setupCodePlaygroundProcessor();
	}

	public onunload() {

	}

    // Inner work

    private setupServices() {
        this._blockExtractorService = new BlockExtractorService();
        this._dataViewPluginService = new DataViewPluginService(this.app);
        this._markdownGeneratorService = new MarkdownGeneratorService(this);
    }

    private setupCodePlaygroundProcessor() {
        this.registerMarkdownCodeBlockProcessor(
			'code-playground',
			async (source, el, ctx) => {
                const codeFiles = this._blockExtractorService.extractCodeFilesFrom(source);

                codeFiles.forEach(codeFile => {
                    this._markdownGeneratorService?.renderCodeBlockFor(codeFile, el);
                });

                console.log(await this._dataViewPluginService?.getTemplateValue(ctx.sourcePath));
            }
        );
    }
}
