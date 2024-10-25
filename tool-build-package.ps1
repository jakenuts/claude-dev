#pnpm install -g @vscode/vsce
rimraf *.vsix
pnpm run compile
pnpm run build:webview
pnpm run package
pnpm vsce pack --no-dependencies 