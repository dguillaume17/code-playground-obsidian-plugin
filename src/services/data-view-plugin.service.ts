import { App } from 'obsidian';
import { DataviewApi, getAPI } from 'obsidian-dataview'

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

    // Inner work

    private setupDataViewApi() {
        this._dataviewApi = getAPI(this._app);

        if (this._dataviewApi == null) {
            // TODO GDER
            alert('Please install DataView plugin');
            return;
        }   
    }

}