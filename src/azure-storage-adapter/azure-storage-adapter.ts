import StorageBase from 'ghost-storage-base';
import { Handler } from 'express';
import { AzureStorageAdapterConfig } from './azure-storage-adapter.model';

export class AzureStorageAdapter extends StorageBase {
	private config: AzureStorageAdapterConfig;

	constructor(suppliedConfig: AzureStorageAdapterConfig) {
		super();

		const envConfig: Partial<AzureStorageAdapterConfig> = {
			connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
			container: process.env.AZURE_STORAGE_CONTAINER,
			cdnUrl: process.env.AZURE_STORAGE_CDN_URL,
			useHttps: process.env.AZURE_STORAGE_USE_HTTPS,
			useDatedFolder: process.env.AZURE_STORAGE_USE_DATED_FOLDER,
			cacheControl: process.env.AZURE_STORAGE_CACHE_CONTROL,
		};
		
		this.config = {
			...envConfig,
			...suppliedConfig,
			...!suppliedConfig.container && {
				container: 'content',
			}
		};
	}
	delete(fileName: string, targetDir?: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	exists(fileName: string, targetDir?: string): Promise<boolean> {
		return Promise.resolve(false);
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
