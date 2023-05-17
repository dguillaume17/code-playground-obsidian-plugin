import { CodeFile } from "src/models/code-file.model";
import { HtmlRendererService } from "./html-renderer.service";
import { MarkdownRendererService } from "./markdown-renderer.service";

export class CodeFileRendererService {

    // Inner properties

    private _containerEl: HTMLElement;
    private _codeFilesToRender: CodeFile[];

    // Lifecycle

    constructor(
        private _htmlRendererService: HtmlRendererService,
        private _markdownRendererService: MarkdownRendererService
    ) {}

    // Interface

    public setContainerEl(containerEl: HTMLElement) {
        this._containerEl = containerEl;
    }

    public renderButton(
        parentEl: HTMLElement,
        sourceCodeFiles: CodeFile[],
        computedCodeFiles: CodeFile[]
    ) {
        this._htmlRendererService.renderButton(
            parentEl,
            'Switch preview mode',
            () => {
                this.renderPreviewWithinContainer(
                    sourceCodeFiles,
                    computedCodeFiles
                );
            });
    }

    public renderPreviewWithinContainer(
        sourceCodeFiles: CodeFile[],
        computedCodeFiles: CodeFile[]
    ) {
        this._htmlRendererService.clearContainer(this._containerEl);

        if (this._codeFilesToRender === sourceCodeFiles) {
            this._codeFilesToRender = computedCodeFiles;
        } else {
            this._codeFilesToRender = sourceCodeFiles;
        }

        this._codeFilesToRender.forEach(codeFile => {
            this._markdownRendererService.renderCodeBlockFor(codeFile, this._containerEl);
        });
    }
}