import { CodeFile } from "src/models/code-file.model";
import { HtmlRendererService } from "./html-renderer.service";
import { MarkdownRendererService } from "./markdown-renderer.service";

export class CodeFileRendererService {

    // Lifecycle

    constructor(
        private _htmlRendererService: HtmlRendererService,
        private _markdownRendererService: MarkdownRendererService
    ) {}

    // Interface

    public render(
        parentEl: HTMLElement,
        sourceCodeFiles: CodeFile[],
        computedCodeFiles: CodeFile[]
    ) {
        let containerEl: HTMLElement;
        let codeFilesToRender = computedCodeFiles; // sourceCodeFiles

        this._htmlRendererService.renderButton(
            parentEl,
            'Switch preview mode',
            () => {
                this._htmlRendererService.clearContainer(containerEl);

                if (codeFilesToRender === computedCodeFiles) {
                    codeFilesToRender = sourceCodeFiles;
                } else {
                    codeFilesToRender = computedCodeFiles;
                }

                codeFilesToRender.forEach(codeFile => {
                    this._markdownRendererService.renderCodeBlockFor(codeFile, containerEl);
                });
            });

        containerEl = this._htmlRendererService.createContainer(parentEl);
    }

}