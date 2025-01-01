// Custom error types for API error handling

export class ApiRateLimitError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiRateLimitError'
    }
}

export class ApiContextSizeError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiContextSizeError'
    }
}

export function isApiRateLimitError(error: any): boolean {
    // Check common rate limit error patterns across different providers
    if (error instanceof ApiRateLimitError) {return true;}
    
    const errorMessage = error?.message?.toLowerCase() || ''
    return (
        errorMessage.includes('rate limit') ||
        errorMessage.includes('too many requests') ||
        error?.status === 429
    )
}

export function isApiContextSizeError(error: any): boolean {
    // Check common context size error patterns across different providers
    if (error instanceof ApiContextSizeError) {return true;}
    
    const errorMessage = error?.message?.toLowerCase() || ''
    return (
        errorMessage.includes('context length') ||
        errorMessage.includes('maximum context length') ||
        errorMessage.includes('context window') ||
        errorMessage.includes('too long')
    )
}

export function handleApiError(error: any): never {
    if (isApiRateLimitError(error)) {
        throw new ApiRateLimitError(error.message)
    }
    
    if (isApiContextSizeError(error)) {
        throw new ApiContextSizeError(error.message)
    }
    
    // Re-throw other errors
    throw error
}
