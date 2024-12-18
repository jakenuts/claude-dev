import defaultShell from "default-shell"
import os from "os"
import osName from "os-name"

export const SYSTEM_PROMPT = async (
	cwd: string,
	supportsComputerUse: boolean,
	enableLargeFileCheck: boolean = false,
) => `You are Cline, a highly skilled software engineer with extensive knowledge in many programming languages, frameworks, design patterns, and best practices.`
