import { ILogger, LogLevel } from './logger.model';

export class ConsoleLogger implements ILogger {
	private readonly targetLogLevel: LogLevel;

	constructor(props?: { loggingLevel?: LogLevel }) {
		this.targetLogLevel = props?.loggingLevel ?? LogLevel.ERROR;
	}

	logDebug(message: string): void {
		if (this.targetLogLevel >= LogLevel.DEBUG) {
			console.debug(this.formatMessage(message));
		}
	}

	logError(message: string): void {
		if (this.targetLogLevel >= LogLevel.ERROR) {
			console.error(this.formatMessage(message));
		}
	}

	logInformation(message: string): void {
		if (this.targetLogLevel >= LogLevel.INFO) {
			console.info(this.formatMessage(message));
		}
	}

	logWarning(message: string): void {
		if (this.targetLogLevel >= LogLevel.WARN) {
			console.warn(this.formatMessage(message));
		}
	}

	private formatMessage(message: string): string {
		// TODO move APP_NAME to const place
		const APP_NAME = 'AzureStorageAdapterTs';
		return `[${APP_NAME}] ${message}`;
	}
}
