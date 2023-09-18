import * as fs from 'node:fs';
import * as path from 'node:path';
import { type IDataStore, type StorageData } from '../types';

export class DataStore implements IDataStore {
	private readonly _filePath: string;
	private dataCache: StorageData = {};

	constructor(fileName?: string) {
		// eslint-disable-next-line unicorn/prefer-module
		this._filePath = path.join(__dirname, '../..', `${fileName}.json`);
		this._initializeDataFile();
	}

	async setItem(key: string, value: any): Promise<void> {
		this.dataCache[key] = value;
		await fs.promises.writeFile(this._filePath, JSON.stringify(this.dataCache));
	}

	getItem(key: string): any {
		return this.dataCache[key];
	}

	getAll(): StorageData {
		return this.dataCache;
	}

	private _initializeDataFile(): void {
		try {
			if (fs.existsSync(this._filePath)) {
				const data: string = fs.readFileSync(this._filePath, 'utf8');
				this.dataCache = JSON.parse(data);
			} else {
				fs.writeFileSync(this._filePath, JSON.stringify({}));
			}
		} catch (error) {
			console.error(error);
		}
	}
}
