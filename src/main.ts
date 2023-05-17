import { Plugin } from 'obsidian';
import { DataViewPluginService } from './services/data-view-plugin.service';
import { MarkdownRendererService } from './services/markdown-renderer.service';;
import { BlockExtractorService } from './services/block-extractor.service';
import { FileService } from './services/file-reader.service';
import { HtmlRendererService } from './services/html-renderer.service';
import { CodeFileRendererService } from './services/code-files-renderer.service';

export default class CodePlaygroundPlugin extends Plugin {

    // Inner properties

    private _blockExtractorService: BlockExtractorService;
    private _codeFilesRendererService: CodeFileRendererService;
    private _dataViewPluginService: DataViewPluginService;
    private _fileReaderService: FileService;
    private _htmlRendererService: HtmlRendererService;
    private _markdownRendererService: MarkdownRendererService;
	
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
        this._fileReaderService = new FileService(this.app);
        this._htmlRendererService = new HtmlRendererService();
        this._markdownRendererService = new MarkdownRendererService(this);

        this._codeFilesRendererService = new CodeFileRendererService(
            this._htmlRendererService,
            this._markdownRendererService
        );
    }

    private setupCodePlaygroundProcessor() {
        this.registerMarkdownCodeBlockProcessor(
			'code-playground',
			async (source, el, ctx) => {
                const sourceCodeFiles = this._blockExtractorService.extractCodeFilesFrom(source);

                const codePlaygroundTemplateFile = await this._dataViewPluginService.getCodePlaygroundTemplateFile(ctx.sourcePath);

                if (codePlaygroundTemplateFile == null) {
                    return;
                }

                const codePlaygroundTemplateFileContent = await this._fileReaderService.readFile(codePlaygroundTemplateFile);

                const templateBlockSource = this._blockExtractorService.extractTemplateBlockSourceFrom(codePlaygroundTemplateFileContent);
                const templateCodeFiles = this._blockExtractorService.extractCodeFilesFrom(templateBlockSource);
                
                const computedCodeFiles = [
                    ...templateCodeFiles.filter(templateCodeFile => !sourceCodeFiles.some(sourceCodeFile => sourceCodeFile.isEqualsTo(templateCodeFile))),
                    ...sourceCodeFiles
                ];

                this._codeFilesRendererService

                this._codeFilesRendererService.render(el, sourceCodeFiles, computedCodeFiles);
            }
        );
    }
}
