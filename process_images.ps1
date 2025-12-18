# STREETMOOD - Process Images and Generate Products
# This script processes all images in imagens_produtos folder and generates streetmood_products.js

# Função para converter USD para EUR baseado nas margens
function Convert-USDToEUR {
    param([double]$usdPrice)
    if ($usdPrice -le 30) { return 70 }
    if ($usdPrice -le 35) { return 75 }
    if ($usdPrice -le 40) { return 80 }
    if ($usdPrice -le 45) { return 90 }
    if ($usdPrice -le 50) { return 100 }
    if ($usdPrice -le 55) { return 110 }
    return [math]::Round($usdPrice * 2)
}

# Preços específicos (USD)
$prices = @{
    'CPFM x Nike Air Force 1' = 49
    'New Balance 530' = 35
    'NOCTA x Nike NSW Tech Fleece Sportswear set' = 58
    'Nike NSW Tech Fleece Sportswear set' = 58
    'casaco polo ralph lauren' = 58
    'Conjunto Nike NSW Tech Fleece Sportswear' = 58
    'Conjunto de roupa esportiva NOCTA x Nike NSW Tech Fleece' = 58
    'The North Face' = 95
    'SynaWord' = 49
    'tears' = 49
    'Trapstar' = 49
    'TRAPSTAR' = 49
    'Morant 3rd generation' = 38
    'Morant 2nd generation' = 38
    'Morant 1st generation' = 38
    'Air Jordan 4 Retro bege partícula' = 38
    'Air Jordan 4 Retro particle beige' = 38
    'Air Jordan 4 Retro preto e branco' = 38
    'Air Jordan 4 Retro black-white' = 38
    'Air Jordan 4' = 53
    'Air Jordan 4 Retro' = 53
    'Air Jordan 5' = 39
    'Air Jordan 1' = 31
    'Air Jordans 1' = 31
    'Air Jordans 3' = 35
    'Air Jordan 11' = 31
    'Air Jordan 13' = 36
    'Nike Air Max Plus Tn' = 40
    'Nocta Hot Step' = 51
    'NOCTA x Nike Air Force 1 Love You Forever Rosa' = 41
    'Nike Air Max 2021' = 35
    'Nike Air Max 95' = 39
    'Air More Uptempo' = 40
    'Nike Shox Ride 2' = 50
    'shox tl' = 45
    'Nike NOCTA Glide Drake' = 45
    'Nike Air Zoom Alphafly NEXT% 3' = 55
    'Nike Air Zoom Alphafly NEXT% 2' = 47
    'Nike Air Zoom Alphafly NEXT% 1' = 47
    'Air Max 720' = 39
    'Air Max 270' = 27
    'Tênis Yeezy Boost 750' = 89
    'Adidas SAMBA OG' = 35
    'Adidas AE1' = 45
    'YEEZY 450' = 43
    'Adidas Dexun' = 29
    'Gucci Rhyton' = 40
    'Tênis Gucci Tennis 1977 Cano Alto GG' = 40
    'Tênis Gucci 1977 GG Canvas' = 40
    'Versace Chain Reaction 2' = 42
    'VEJA Campo Unissex' = 36
    'AMIRI MA-1' = 58
}

# Função para normalizar nome
function Normalize-ProductName {
    param([string]$name)
    return ($name.ToLower() -replace "['`"]", '' -replace '\s+', ' ').Trim()
}

# Função para extrair tamanho
function Get-Size {
    param([string]$name)
    if ($name -match '\(([^)]+)\)') { return $matches[1] }
    if ($name -match '(\d{2}-\d{2})') { return $matches[1] }
    return $null
}

# Função para limpar nome
function Clean-ProductName {
    param([string]$name)
    $cleaned = $name -replace '\([^)]+\)', '' -replace '\d{2}-\d{2}', '' -replace '_\d+\.(jpg|jpeg|png)$', '' -replace '\.(jpg|jpeg|png)$', '' -replace '\s+', ' '
    return $cleaned.Trim()
}

# Função para extrair cor
function Get-Color {
    param([string]$name)
    $colors = @('azul', 'preto', 'branco', 'vermelho', 'rosa', 'verde', 'amarelo', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'dourado', 'prata', 'black', 'white', 'blue', 'red', 'green', 'pink', 'yellow', 'grey', 'gray', 'brown', 'orange', 'purple', 'gold', 'silver')
    $normalized = $name.ToLower()
    foreach ($color in $colors) {
        if ($normalized -like "*$color*") { return $color }
    }
    return $null
}

# Função para obter nome base
function Get-BaseName {
    param([string]$name)
    $base = Clean-ProductName $name
    $colors = @('azul', 'preto', 'branco', 'vermelho', 'rosa', 'verde', 'amarelo', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'dourado', 'prata', 'black', 'white', 'blue', 'red', 'green', 'pink', 'yellow', 'grey', 'gray', 'brown', 'orange', 'purple', 'gold', 'silver')
    foreach ($color in $colors) {
        $base = $base -replace "\b$color\b", ''
    }
    $base = $base -replace '\s+\d{6,}[-\s]?\d{0,6}', '' -replace '\s+\d{6,}-\d{3,}', ''
    return ($base -replace '\s+', ' ').Trim()
}

# Função para encontrar preço
function Find-Price {
    param([string]$productName)
    $normalized = Normalize-ProductName $productName
    
    foreach ($key in $prices.Keys) {
        $normalizedKey = Normalize-ProductName $key
        if ($normalized -like "*$normalizedKey*" -or $normalizedKey -like "*$normalized*") {
            return Convert-USDToEUR $prices[$key]
        }
    }
    
    # Padrões específicos
    if ($normalized -like '*jordan 4*' -or $normalized -like '*air jordan 4*') {
        if ($normalized -like '*retro*' -and $normalized -notlike '*particle beige*' -and $normalized -notlike '*black-white*') {
            return Convert-USDToEUR 53
        }
        if ($normalized -like '*particle beige*' -or $normalized -like '*black-white*' -or $normalized -like '*preto e branco*') {
            return Convert-USDToEUR 38
        }
        return Convert-USDToEUR 53
    }
    if ($normalized -like '*jordan 1*' -or $normalized -like '*air jordan 1*' -or $normalized -like '*jordans 1*') {
        return Convert-USDToEUR 31
    }
    if ($normalized -like '*jordan 3*' -or $normalized -like '*air jordan 3*' -or $normalized -like '*jordans 3*') {
        return Convert-USDToEUR 35
    }
    if ($normalized -like '*jordan 5*' -or $normalized -like '*air jordan 5*') {
        return Convert-USDToEUR 39
    }
    if ($normalized -like '*jordan 11*' -or $normalized -like '*air jordan 11*') {
        return Convert-USDToEUR 31
    }
    if ($normalized -like '*jordan 13*' -or $normalized -like '*air jordan 13*') {
        return Convert-USDToEUR 36
    }
    
    # Preço padrão
    if ($normalized -like '*dior*' -or $normalized -like '*gucci*' -or $normalized -like '*versace*' -or $normalized -like '*louis vuitton*' -or $normalized -like '*lv*' -or $normalized -like '*amiri*') {
        return 100
    }
    if ($normalized -like '*jordan*' -or $normalized -like '*air jordan*') {
        return 87
    }
    if ($normalized -like '*nike*' -or $normalized -like '*adidas*' -or $normalized -like '*puma*' -or $normalized -like '*new balance*') {
        return 69
    }
    return 74
}

# Função para determinar categoria
function Get-Category {
    param([string]$name)
    $normalized = $name.ToLower()
    $clothingKeywords = @('hoodie', 'tshirt', 't-shirt', 'jogger', 'short', 'windbreaker', 'fato', 'treino', 'set', 'casaco', 'jacket', 'the north face', 'trapstar', 'synaword', 'nocta', 'tech fleece', 'sportswear', 'polo ralph lauren', 'colete', 'tears', 'sportswear set')
    foreach ($keyword in $clothingKeywords) {
        if ($normalized -like "*$keyword*") {
            return 'roupas'
        }
    }
    return $null
}

# Processar imagens
Write-Host "Processando imagens..." -ForegroundColor Green

$imagesDir = Join-Path $PSScriptRoot "imagens_produtos"
$allFiles = Get-ChildItem -Path $imagesDir -Recurse -Include *.jpg,*.jpeg,*.png

$productGroups = @{}

foreach ($file in $allFiles) {
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $dirName = if ($file.DirectoryName -ne $imagesDir) { Split-Path -Leaf $file.DirectoryName } else { '' }
    
    $productName = if ($dirName -and $dirName -ne 'imagens_produtos') { $dirName } else { $fileName }
    $cleanedName = Clean-ProductName $productName
    $baseName = Get-BaseName $cleanedName
    $color = Get-Color $cleanedName
    $size = Get-Size $productName
    if (-not $size) { $size = Get-Size $dirName }
    
    $productKey = if ($color) { "$baseName|||$color" } else { $baseName }
    
    if (-not $productGroups.ContainsKey($productKey)) {
        $productGroups[$productKey] = @{
            name = $cleanedName
            baseName = $baseName
            color = $color
            images = @()
            sizes = @{}
            category = Get-Category $cleanedName
        }
    }
    
    $relativePath = $file.FullName.Replace($PSScriptRoot + '\', '').Replace('\', '/')
    $productGroups[$productKey].images += $relativePath
    
    if ($size) {
        $productGroups[$productKey].sizes[$size] = $true
    }
}

# Criar produtos
$products = @()
$id = 1

$bestSellers = @(
    'CPFM x Nike Air Force 1',
    'New Balance 530',
    'NOCTA x Nike NSW Tech Fleece Sportswear set',
    'Nike NSW Tech Fleece Sportswear set',
    'casaco polo ralph lauren'
)

foreach ($productKey in $productGroups.Keys) {
    $group = $productGroups[$productKey]
    
    # Ordenar imagens
    $group.images = $group.images | Sort-Object {
        if ($_ -match '_(\d+)\.(jpg|jpeg|png)$') {
            [int]$matches[1]
        } else {
            0
        }
    }
    
    $sizeArray = $group.sizes.Keys
    $size = if ($sizeArray.Count -gt 0) { $sizeArray[0] } else { $null }
    
    $priceEur = Find-Price $group.name
    
    $isBestSeller = $false
    foreach ($bs in $bestSellers) {
        $normalizedBS = Normalize-ProductName $bs
        $normalizedName = Normalize-ProductName $group.name
        if ($normalizedName -like "*$normalizedBS*" -or $normalizedBS -like "*$normalizedName*") {
            $isBestSeller = $true
            break
        }
    }
    
    $finalName = $group.name -replace '\([^)]+\)', '' -replace '\d{2}-\d{2}', '' -replace '\s+', ' '
    $finalName = $finalName.Trim()
    
    $product = @{
        id = $id++
        name = $finalName
        size = $size
        tipo = 'stock'
        category = $group.category
        price_eur = $priceEur
        price = "$priceEur€"
        desc = 'Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.'
        images = $group.images
        image = if ($group.images.Count -gt 0) { $group.images[0] } else { $null }
        isBestSeller = $isBestSeller
    }
    
    $products += $product
}

# Gerar arquivo
$output = @"
// STREETMOOD Products - Main product list
// This file contains all products for STREETMOOD catalog
// Generated automatically from images in imagens_produtos folder
if (typeof products === 'undefined') {
    var products = $($products | ConvertTo-Json -Depth 10 -Compress);
}

// Garantir que products está disponível globalmente
if (typeof window !== 'undefined') {
    window.products = products;
}
"@

$outputFile = Join-Path $PSScriptRoot "streetmood_products.js"
$output | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "✅ Generated $($products.Count) products from images" -ForegroundColor Green
Write-Host "✅ Best sellers: $($products | Where-Object { $_.isBestSeller } | Measure-Object | Select-Object -ExpandProperty Count) products" -ForegroundColor Green
Write-Host "✅ Products with images: $($products | Where-Object { $_.images -and $_.images.Count -gt 0 } | Measure-Object | Select-Object -ExpandProperty Count)" -ForegroundColor Green

