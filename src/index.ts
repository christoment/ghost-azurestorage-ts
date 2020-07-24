import { AzureStorageAdapter } from './azure-storage-adapter/index';

export * from './azure-storage-adapter/index';

// Export it for Ghost to consume
module.exports = AzureStorageAdapter;
