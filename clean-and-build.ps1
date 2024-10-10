rimraf .\node_modules\
rimraf dist
rimraf ..\webview-ui\node_modules\
rimraf ..\webview-ui\dist
npm run install:all
npm run build:webview
npm run vscode:build-and-install