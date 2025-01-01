import { Anthropic } from "@anthropic-ai/sdk"
import delay from "delay"
import { ApiHandler } from "../index"
import { ApiStream } from "../transform/stream"
import { ApiRateLimitError, ApiContextSizeError, isApiRateLimitError, isApiContextSizeError } from "../errors/api-errors"

export abstract class BaseApiHandler implements ApiHandler {
    protected async *handleApiRequest(
        operation: () => AsyncGenerator<any, void, unknown>,
        retryConfig = { maxRetries: 3, initialDelay: 30 }
    ): ApiStream {
        let retryCount = 0
        let retryDelay = retryConfig.initialDelay

        try {
            yield* operation()
        } catch (error) {
            if (isApiRateLimitError(error) && retryCount < retryConfig.maxRetries) {
                await delay(retryDelay * 1000)
                retryCount++
                retryDelay *= 2
                yield* this.handleApiRequest(operation, {
                    ...retryConfig,
                    maxRetries: retryConfig.maxRetries - 1
                })
                return
            }

            if (isApiContextSizeError(error)) {
                throw new ApiContextSizeError(
                    "The operation could not be completed due to the size of the output overloading the context. " +
                    "Try breaking down the task into smaller steps or reducing the amount of context."
                )
            }

            throw error
        }
    }

    abstract createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream
    abstract getModel(): { id: string; info: any }
}
