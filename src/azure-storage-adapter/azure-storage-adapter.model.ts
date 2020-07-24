export interface AzureStorageAdapterConfigParam {
  connectionString: string;
  container: string;
  cdnUrl: string;
  useHttps: boolean;
  useDatedFolder: boolean;
  cacheControl: string;
}

export interface AzureStorageAdapterConfig {
  connectionString: string;
  container: string;
  cdnUrl: string;
  useHttps: string;
  useDatedFolder: string;
  cacheControl: string;
}
