export interface AzureStorageAdapterConfigFromGhost {
  connectionString: string;
  container: string;
  cdnUrl: string;
  useHttps: string;
  useDatedFolder: string;
  cacheControl: string;
}

export interface OptionalAzureStorageAdapterModel {
  useHttps: boolean;
  useDatedFolder: boolean;
  cacheControl: string;
  container: string;
}

export interface AzureStorageAdapterConfig extends OptionalAzureStorageAdapterModel {
  connectionString: string;
  cdnUrl: string;
}
