# Functional Differences Between Branches

## API Changes

### Anthropic Provider Enhancements
- Added support for Claude 3 models (claude-3-opus-20240229, claude-3-haiku-20240307, etc.)
- Implemented prompt caching functionality for Claude 3 models
- Added cache control features for system prompts and messages
- Improved rate limit handling with exponential backoff
- Enhanced token usage tracking including cache read/write metrics

### Provider Changes
- Removed DeepSeek provider (src/api/providers/deepseek.ts was deleted)
- Updated OpenRouter provider implementation

## Core Functionality

### Diff Handling Improvements (src/core/assistant-message/diff.ts)
- Added sophisticated fallback matching strategies:
  1. Line-trimmed fallback match: Matches content ignoring whitespace
  2. Block anchor fallback match: Uses first/last lines as anchors for blocks of 3+ lines
- Enhanced error handling and reporting for unmatched content
- Improved handling of partial markers in streamed diffs
- Better support for incremental file updates

### Workflow Improvements
- Added GitHub Actions workflows:
  - build-and-release.yml: Automated build and release process
  - pull-upstream-and-merge.yml: Automated upstream sync

## Notable Removals/Changes
- Removed DeepSeek integration
- Streamlined error handling across providers
- Enhanced token usage tracking and reporting

## Technical Improvements
- Better handling of streaming responses
- Improved cache control mechanisms
- Enhanced error reporting and recovery strategies
- More robust diff matching algorithms with multiple fallback strategies

This summary excludes changes related to package.json dependencies and name changes from Cline to Cline Unleashed.
