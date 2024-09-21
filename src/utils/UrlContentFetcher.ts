import * as vscode from "vscode"
import * as fs from "fs/promises"
import * as path from "path"
import { Browser, Page, launch } from "puppeteer-core"
import * as cheerio from "cheerio"
import TurndownService from "turndown"
// @ts-ignore
import PCR from "puppeteer-chromium-resolver"
import pWaitFor from "p-wait-for"

interface PCRStats {
	puppeteer: { launch: typeof launch }
	executablePath: string
}

export class UrlContentFetcher {
	private context: vscode.ExtensionContext
	private browser?: Browser
	private page?: Page

	constructor(context: vscode.ExtensionContext) {
		this.context = context
	}

	private async ensureChromiumExists(): Promise<PCRStats> {
		const globalStoragePath = this.context?.globalStorageUri?.fsPath
		if (!globalStoragePath) {
			throw new Error("Global storage uri is invalid")
		}

		const puppeteerDir = path.join(globalStoragePath, "puppeteer")
		const dirExists = await fs
			.access(puppeteerDir)
			.then(() => true)
			.catch(() => false)
		if (!dirExists) {
			await fs.mkdir(puppeteerDir, { recursive: true })
		}

		// if chromium doesn't exist, this will download it to path.join(puppeteerDir, ".chromium-browser-snapshots")
		// if it does exist it will return the path to existing chromium
		const stats: PCRStats = await PCR({
			downloadPath: puppeteerDir,
		})

		return stats
	}

	async launchBrowser(): Promise<void> {
		if (this.browser) {
			return
		}
		const stats = await this.ensureChromiumExists()
		this.browser = await stats.puppeteer.launch({
			args: [
				"--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			],
			executablePath: stats.executablePath,
		})
		// (latest version of puppeteer does not add headless to user agent)
		this.page = await this.browser?.newPage()
	}

	async closeBrowser(): Promise<void> {
		await this.browser?.close()
		this.browser = undefined
		this.page = undefined
	}

	// must make sure to call launchBrowser before and closeBrowser after using this
	async urlToMarkdown(url: string): Promise<string> {
		if (!this.browser || !this.page) {
			throw new Error("Browser not initialized")
		}
		/*
		- networkidle2 is equivalent to playwright's networkidle where it waits until there are no more than 2 network connections for at least 500 ms.
		- domcontentloaded is when the basic DOM is loaded
		this should be sufficient for most doc sites
		*/
		await this.page.goto(url, { timeout: 10_000, waitUntil: ["domcontentloaded", "networkidle2"] })
		const content = await this.page.content()

		// use cheerio to parse and clean up the HTML
		const $ = cheerio.load(content)
		$("script, style, nav, footer, header").remove()

		// convert cleaned HTML to markdown
		const turndownService = new TurndownService()
		const markdown = turndownService.turndown($.html())

		return markdown
	}

	async urlToScreenshotAndLogs(url: string): Promise<{ screenshot: string; logs: string }> {
		if (!this.browser || !this.page) {
			throw new Error("Browser not initialized")
		}

		const logs: string[] = []
		let lastLogTs = Date.now()

		this.page.on("console", (msg) => {
			if (msg.type() === "log") {
				logs.push(msg.text())
			} else {
				logs.push(`[${msg.type()}] ${msg.text()}`)
			}
			lastLogTs = Date.now()
		})
		this.page.on("pageerror", (err) => {
			logs.push(`[Page Error] ${err.toString()}`)
			lastLogTs = Date.now()
		})

		try {
			// networkidle2 is a good point to take a screenshot without having to wait for the timeout to hit if the site never reaches networkidle0
			await this.page.goto(url, { timeout: 10_000, waitUntil: ["domcontentloaded", "networkidle2"] })
		} catch (err) {
			// if (!(err instanceof TimeoutError)) {
			// 	logs.push(`[Navigation Error] ${err.toString()}`)
			// }
			logs.push(`[Navigation Error] ${err.toString()}`)
		}

		// Wait for console inactivity, with a timeout
		await pWaitFor(() => Date.now() - lastLogTs >= 500, {
			timeout: 3_000,
			interval: 100,
		}).catch(() => {})

		const screenshotBase64 = await this.page.screenshot({
			fullPage: true,
			type: "webp",
			encoding: "base64",
			// quality: 80,
		})

		const screenshot = `data:image/webp;base64,${screenshotBase64}`

		this.page.removeAllListeners()

		return {
			screenshot,
			logs: logs.join("\n"),
		}
	}
}
