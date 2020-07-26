import StorageBase from 'ghost-storage-base';
import { Handler } from 'express';
import {
	AzureStorageAdapterConfig,
	AzureStorageAdapterConfigFromGhost,
	OptionalAzureStorageAdapterModel
} from './azure-storage-adapter.model';
import { resolveStringParam } from '../utils/param.utils';
import fetch from 'node-fetch';
import { ILogger } from '../utils/logger.model';
import { ConsoleLogger } from '../utils/console-logger';
import { BlobServiceClient } from '@azure/storage-blob';

const DEFAULT_CONFIG: OptionalAzureStorageAdapterModel = {
	cacheControl: '2592000', // in seconds, 30 days
	useDatedFolder: false,
	useHttps: false,
	container: 'content',
};

export class AzureStorageAdapter extends StorageBase {
	private readonly config: AzureStorageAdapterConfig;
	private readonly logger: ILogger;
	private readonly azureBlobStorage: BlobServiceClient;

	constructor(suppliedConfig: AzureStorageAdapterConfigFromGhost) {
		super();
		this.logger = new ConsoleLogger();
		
		this.config = {
			connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || suppliedConfig.connectionString,
			container: (process.env.AZURE_STORAGE_CONTAINER || suppliedConfig.container) ?? DEFAULT_CONFIG.container,
			cdnUrl: process.env.AZURE_STORAGE_CDN_URL || suppliedConfig.cdnUrl,
			useHttps: resolveStringParam(process.env.AZURE_STORAGE_USE_HTTPS || suppliedConfig.useHttps) ?? DEFAULT_CONFIG.useHttps,
			useDatedFolder: resolveStringParam(process.env.AZURE_STORAGE_USE_DATED_FOLDER || suppliedConfig.useDatedFolder) ?? DEFAULT_CONFIG.useDatedFolder,
			cacheControl: (process.env.AZURE_STORAGE_CACHE_CONTROL || suppliedConfig.cacheControl) ?? DEFAULT_CONFIG.cacheControl,
		};

		this.validateConfig(this.config);
		this.azureBlobStorage = new BlobServiceClient(this.config.connectionString);
	}

	delete(fileName: string, targetDir?: string): Promise<boolean> {
		return this.azureBlobStorage
			.getContainerClient(this.config.container)
			.deleteBlob(fileName, {
				conditions: {
					ifUnmodifiedSince: new Date(),
				}
			})
			.then((response) => {
				this.logger.logInformation(`Blob ${fileName} deleted on request ID: ${response.requestId}`);
				return true;
			})
			.catch((reason) => {
				this.logger.logError(`Failed to delete blob ${fileName} - Reason: ${reason}`);
				return false;
			});
	}

	exists(fileName: string, targetDir?: string): Promise<boolean> {
		return fetch(fileName)
			.then((res) => res.status === 200)
			.catch((error) => {
				this.logger.logError(error);
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

	private validateConfig(config: AzureStorageAdapterConfig) {
		if (!config.connectionString) {
			this.logger.logError('Missing connection string');
			throw Error('Missing connection string');
		}
	}
}
