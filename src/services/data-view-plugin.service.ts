import { App, TFile } from 'obsidian';
import { DataviewApi, Link, getAPI } from 'obsidian-dataview'

export class DataViewPluginService {

    // Inner properties

    private _dataviewApi: DataviewApi | undefined;

    // Lifecycle

    constructor(
        private _app: App
    ) {
        this.setupDataViewApi();
    }

    // Interface

    public async getCodePlaygroundTemplateFileValue(filePath: string): Promise<TFile | null> {
        const TEMPLATE_PROPERTY_NAME = 'code-playground-template';
        const file = await this.getFileFrom(filePath, TEMPLATE_PROPERTY_NAME);

        return file;
    }

    // Inner work

    private setupDataViewApi() {
        this._dataviewApi = getAPI(this._app);

        if (this._dataviewApi == null) {
            // TODO
            alert('Please install DataView plugin');
            return;
        }   
    }

    private async getFileFrom(filePath: string, propertyName: string): Promise<TFile | null> {

        const link = await this.getValueFrom<Link>(filePath, propertyName);

        if (link == null) {
            return null;
        }

        const file = this._app.vault.getAbstractFileByPath(link.path) as TFile | null;

        // TODO : checker la validité de la variable file puisque getAbstractFileByPath peut soit retourner un type TFile ou TFolder

        return file;
    }

    private async getValueFrom<T extends string | Link>(filePath: string, propertyName: string): Promise<T> {
        const queryResult = await this._dataviewApi?.query(`TABLE WITHOUT ID ${propertyName} WHERE file.path = "${filePath}"`);

        return (queryResult as any).value.values[0][0]
    }

}