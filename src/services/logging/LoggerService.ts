/**
 * Centralized logging service for the extension.
 * Provides a singleton instance for consistent logging across all services.
 *
 * Usage:
 * ```ts
 * const logger = LoggerService.getInstance();
 * logger.log("Message", "ServiceName");
 * ```
 */

import * as vscode from "vscode"

export class LoggerService {
	private static instance: LoggerService
	private outputChannel: vscode.OutputChannel
	private disposed = false

	private constructor() {
		this.outputChannel = vscode.window.createOutputChannel("Cline")
	}

	public static getInstance(): LoggerService {
		if (!LoggerService.instance) {
			LoggerService.instance = new LoggerService()
		}
		return LoggerService.instance
	}

	/**
	 * Log a message with optional source identifier
	 * @param message The message to log
	 * @param source Optional source identifier (e.g. service name)
	 */
	public log(message: string, source?: string) {
		if (this.disposed) return;
		const timestamp = new Date().toISOString()
		const prefix = source ? `[${source}]` : ""
		this.outputChannel.appendLine(`${timestamp} ${prefix} ${message}`)
	}

	/**
	 * Get the underlying VS Code OutputChannel
	 * For use in extension.ts to register for disposal
	 */
	public getOutputChannel(): vscode.OutputChannel {
		return this.outputChannel
	}

	/**
	 * Dispose of the output channel
	 * Should only be called when the extension is deactivated
	 */
	public dispose() {
		if (!this.disposed) {
			this.disposed = true
			this.outputChannel.dispose()
		}
	}

	/**
	 * Log a service operation with details
	 * @param service The service name
	 * @param operation The operation being performed
	 * @param details Optional additional details
	 */
	public logOperation(service: string, operation: string, details?: string) {
		const message = details ? `${operation}: ${details}` : operation
		this.log(message, service)
	}
}
