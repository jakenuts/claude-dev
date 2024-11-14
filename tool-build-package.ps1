#npm install -g @vscode/vsce
rm *.vsix
#npm run compile
#npm run build:webview
npm run package
npx vsce package #--no-dependencies 