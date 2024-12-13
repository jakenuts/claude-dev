# Read the package.json file
$packageJson = Get-Content -Raw -Path "./package.json" | ConvertFrom-Json

# Extract the version
$Release = $packageJson.version

Write-Output "Creating new release with version: $Release"

git tag v$Release 
git push origin v$Release 

gh release create v$Release --generate-notes
gh release upload v$Release cline-unleashed-$Release.vsix