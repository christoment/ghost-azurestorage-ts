import StorageBase from 'ghost-storage-base';
import { Handler } from 'express';
import {
	AzureStorageAdapterConfig,
	AzureStorageAdapterConfigFromGhost,
	OptionalAzureStorageAdapterModel
} from './azure-storage-adapter.model';
import { resolveStringParam } from '../utils/param.utils';
import fetch from 'node-fetch';

const DEFAULT_CONFIG: OptionalAzureStorageAdapterModel = {
	cacheControl: '2592000', // in seconds, 30 days
	useDatedFolder: false,
	useHttps: false,
	container: 'content',
};

export class AzureStorageAdapter extends StorageBase {
	private config: AzureStorageAdapterConfig;

	constructor(suppliedConfig: AzureStorageAdapterConfigFromGhost) {
		super();
		
		this.config = {
			connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || suppliedConfig.connectionString,
			container: (process.env.AZURE_STORAGE_CONTAINER || suppliedConfig.container) ?? DEFAULT_CONFIG.container,
			cdnUrl: process.env.AZURE_STORAGE_CDN_URL || suppliedConfig.cdnUrl,
			useHttps: resolveStringParam(process.env.AZURE_STORAGE_USE_HTTPS || suppliedConfig.useHttps) ?? DEFAULT_CONFIG.useHttps,
			useDatedFolder: resolveStringParam(process.env.AZURE_STORAGE_USE_DATED_FOLDER || suppliedConfig.useDatedFolder) ?? DEFAULT_CONFIG.useDatedFolder,
			cacheControl: (process.env.AZURE_STORAGE_CACHE_CONTROL || suppliedConfig.cacheControl) ?? DEFAULT_CONFIG.cacheControl,
		};
	}

	delete(fileName: string, targetDir?: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	exists(fileName: string, targetDir?: string): Promise<boolean> {
		return fetch(fileName)
			.then((res) => res.status === 200)
			.catch((error) => {
				console.error(error);
				return false;
			});
	}

	read(options?: StorageBase.ReadOptions): Promise<Buffer> {
		return Promise.resolve(null as any);
	}

	save(image: StorageBase.Image, targetDir?: string): Promise<string> {
		return Promise.resolve('');
	}

	serve(): Handler {
		return null as any;
	}
}
