export interface ILogger {
	logDebug(message: string): void;
	logInformation(message: string): void;
	logWarning(message: string): void;
	logError(message: string): void;
}

export enum LogLevel {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
}
