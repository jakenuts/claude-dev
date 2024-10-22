#pnpm install -g @vscode/vsce

pnpm run compile
pnpm run build:webview
pnpm run package
vsce package