#npm install -g @vscode/vsce

#npm run compile
#npm run build:webview

rm *.vsix

npm run install:all
npm run package
npx vsce package #--no-dependencies 