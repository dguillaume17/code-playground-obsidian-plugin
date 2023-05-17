import { App, TFile } from "obsidian";

export class FileService {

    // Lifecycle

    constructor(
        private _app: App
    ) {}

    // Interface

    public async readFile(file: TFile) {
        return await this._app.vault.read(file);
    }
}