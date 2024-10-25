rimraf .\node_modules\
rimraf dist
rimraf package-lock.json
rimraf ..\webview-ui\node_modules\
rimraf ..\webview-ui\dist
rimraf ..\webview-ui\package-lock.json

npm run install:all

.\tool-build-package.ps1

#npm run vscode:build-and-install