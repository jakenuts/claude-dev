interface CurationConfig {
    maxRows?: number;
    maxTotalChars?: number;
    keepEdges?: number;
    truncationMessage?: string;
}

export class Curation {
    // Default configurations for different content types
    private static readonly DEFAULTS = {
        CONSOLE_LOGS: {
            maxRows: 50,
            maxTotalChars: 10000,
            keepEdges: 10,
            truncationMessage: "-- PARTIAL RESULT : {count} ROWS REMOVED HERE TO LIMIT SIZE --"
        },
        FILE_CONTENT: {
            maxRows: 1000,
            maxTotalChars: 50000,
            keepEdges: 50,
            truncationMessage: "... {count} LINES TRUNCATED ..."
        },
        WEB_CONTENT: {
            maxRows: 200,
            maxTotalChars: 20000,
            keepEdges: 20,
            truncationMessage: "... {count} LINES OMITTED ..."
        }
    };

    /**
     * Truncates an array of strings based on provided configuration
     */
    static truncateArray(
        items: string[],
        config: CurationConfig = Curation.DEFAULTS.CONSOLE_LOGS
    ): string[] {
        const {
            maxRows = Curation.DEFAULTS.CONSOLE_LOGS.maxRows,
            maxTotalChars = Curation.DEFAULTS.CONSOLE_LOGS.maxTotalChars,
            keepEdges = Curation.DEFAULTS.CONSOLE_LOGS.keepEdges,
            truncationMessage = Curation.DEFAULTS.CONSOLE_LOGS.truncationMessage
        } = config;



        // If within limits, return original array
        if (items.length <= maxRows) {
            const totalChars = items.reduce((sum, item) => sum + item.length, 0);
            if (totalChars <= maxTotalChars) {

                console.log(`[Curation] Content approved ${items.length} lines of ${totalChars} chars.`);
                return items;
            }
        }

        // If we need to truncate by row count
        if (items.length > maxRows) {
            const removedCount = items.length - (2 * keepEdges);
            if (removedCount > 0) {
                const firstPart = items.slice(0, keepEdges);
                const lastPart = items.slice(-keepEdges);

                console.log(`[Curation] Content truncated, ${removedCount} of ${items.length} lines removed.`);

                return [
                    ...firstPart,
                    truncationMessage.replace("{count}", removedCount.toString()),
                    ...lastPart
                ];
            }
        }

        // If we need to truncate by character count
        let currentSize = 0;
        let startIndex = 0;
        let endIndex = items.length - 1;
        const truncatedItems: string[] = [];
        
        while (startIndex <= endIndex) {
            if (currentSize >= maxTotalChars) {
                const removedCount = endIndex - startIndex + 1;

                console.log(`[Curation] Content truncated, ${removedCount} of ${currentSize} chars removed.`);

                if (removedCount > 0) {
                    truncatedItems.splice(
                        truncatedItems.length / 2,
                        0,
                        truncationMessage.replace("{count}", removedCount.toString())
                    );
                }
                break;
            }

            if (startIndex === endIndex) {
                const item = items[startIndex];
                if (currentSize + item.length <= maxTotalChars) {
                    truncatedItems.push(item);
                }
                break;
            }

            const startItem = items[startIndex];
            const endItem = items[endIndex];
            
            if (currentSize + startItem.length + endItem.length <= maxTotalChars) {
                truncatedItems.push(startItem);
                truncatedItems.push(endItem);
                currentSize += startItem.length + endItem.length;
                startIndex++;
                endIndex--;
            } else {
                break;
            }
        }

        return truncatedItems;
    }

    /**
     * Truncates a single string based on provided configuration
     */
    static truncateString(
        content: string,
        config: CurationConfig = Curation.DEFAULTS.FILE_CONTENT
    ): string {
        const lines = content.split('\n');
        const truncatedLines = this.truncateArray(lines, config);
        return truncatedLines.join('\n');
    }

    /**
     * Preset configurations for common use cases
     */
    static get forConsoleLogs() {
        return (items: string[]) => this.truncateArray(items, this.DEFAULTS.CONSOLE_LOGS);
    }

    static get forFileContent() {
        return (content: string) => this.truncateString(content, this.DEFAULTS.FILE_CONTENT);
    }

    static get forWebContent() {
        return (items: string[]) => this.truncateArray(items, this.DEFAULTS.WEB_CONTENT);
    }
}
