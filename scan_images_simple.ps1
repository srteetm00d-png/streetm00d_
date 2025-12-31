# STREETMOOD - Simple Image Scanner
# Escanear todas as imagens da pasta imagens_produtos

Write-Host "🔍 Escaneando pasta imagens_produtos..." -ForegroundColor Yellow

$imagensFolder = Join-Path $PSScriptRoot "imagens_produtos"

if (-not (Test-Path $imagensFolder)) {
    Write-Host "❌ Pasta imagens_produtos não encontrada!" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $imagensFolder -File
$imageFiles = $files | Where-Object { 
    $_.Extension -in @('.jpg', '.jpeg', '.png', '.gif', '.webp') 
} | Select-Object -ExpandProperty Name

Write-Host "📁 Encontrados $($imageFiles.Count) arquivos de imagem" -ForegroundColor Green

# Gerar lista simples
$imageList = @"
// Lista de imagens da pasta imagens_produtos
// Total: $($imageFiles.Count) arquivos
// Gerado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')

$($imageFiles -join "`n")
"@

$imageList | Out-File -FilePath (Join-Path $PSScriptRoot "image_list.txt") -Encoding UTF8

# Gerar código JavaScript para o imageScanner
$knownImages = $imageFiles | ForEach-Object { "        '$_'" }

$jsKnownImages = @"
// STREETMOOD - Lista de imagens atualizada automaticamente
// Gerado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')
// Total de imagens: $($imageFiles.Count)

// Copie e cole esta lista no index.html onde está o knownImages:
$($knownImages -join ",`n")
"@

$jsKnownImages | Out-File -FilePath (Join-Path $PSScriptRoot "image_scanner_list.txt") -Encoding UTF8

Write-Host "✅ Scan concluído!" -ForegroundColor Green
Write-Host "📄 Arquivos gerados:" -ForegroundColor Cyan
Write-Host "   - image_list.txt (lista completa)" -ForegroundColor White
Write-Host "   - image_scanner_list.txt (lista para index.html)" -ForegroundColor White
Write-Host "📊 Total de imagens processadas: $($imageFiles.Count)" -ForegroundColor Green

$jpgCount = ($imageFiles | Where-Object { $_ -match '\.jpg$' }).Count
$jpegCount = ($imageFiles | Where-Object { $_ -match '\.jpeg$' }).Count
$pngCount = ($imageFiles | Where-Object { $_ -match '\.png$' }).Count

Write-Host "📈 Estatísticas:" -ForegroundColor Cyan
Write-Host "   - JPG: $jpgCount" -ForegroundColor White
Write-Host "   - JPEG: $jpegCount" -ForegroundColor White
Write-Host "   - PNG: $pngCount" -ForegroundColor White
