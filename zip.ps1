$items = "scripts", "styles", "manifest.json"
$output = "ux.zip"

if (Test-Path $output) { Remove-Item $output }

Compress-Archive -Path $items -DestinationPath $output
Write-Host "Done" -ForegroundColor Green
