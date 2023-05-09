import { App } from 'obsidian';
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

    public async getTemplateValue(linkPath: string): Promise<string> {
        const TEMPLATE_PROPERTY_NAME = 'code-playground-template';
        const link = await this.getValueFrom<Link>(linkPath, TEMPLATE_PROPERTY_NAME);

        return link?.path ?? '';
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

    private async getValueFrom<T extends string | Link>(linkPath: string, propertyName: string): Promise<T> {
        const queryResult = await this._dataviewApi?.query(`TABLE WITHOUT ID ${propertyName} WHERE file.path = "${linkPath}"`);

        return (queryResult as any).value.values[0][0]
    }

}