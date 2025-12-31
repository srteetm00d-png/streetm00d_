# STREETMOOD - Auto Image Scanner (PowerShell)
# Script para escanear automaticamente todas as imagens da pasta imagens_produtos
# e gerar a lista atualizada para o imageScanner

Write-Host "🔍 Escaneando pasta imagens_produtos..." -ForegroundColor Yellow

$imagensFolder = Join-Path $PSScriptRoot "imagens_produtos"

try {
    # Verificar se a pasta existe
    if (-not (Test-Path $imagensFolder)) {
        Write-Host "❌ Pasta imagens_produtos não encontrada!" -ForegroundColor Red
        exit 1
    }

    # Ler todos os arquivos da pasta
    $files = Get-ChildItem -Path $imagensFolder -File
    
    # Filtrar apenas imagens
    $imageFiles = $files | Where-Object { 
        $_.Extension -in @('.jpg', '.jpeg', '.png', '.gif', '.webp') 
    } | Select-Object -ExpandProperty Name

    Write-Host "📁 Encontrados $($imageFiles.Count) arquivos de imagem" -ForegroundColor Green

    # Gerar código JavaScript para copiar/colar
    $knownImages = $imageFiles | ForEach-Object { "'$_'" }
    
    $jsCode = @"
// STREETMOOD - Lista de imagens atualizada automaticamente
// Gerado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')
// Total de imagens: $($imageFiles.Count)

const imageScanner = {
    // All product images from imagens_produtos folder
    knownImages: [
$($knownImages -join ",`n    ")
    ],
    
    groupImagesByBaseName: function() {
        const groups = {};
        
        this.knownImages.forEach(imagePath => {
            const match = imagePath.match(/(.+?)_\\d+\\.(jpg|jpeg|png)$/i);
            if (match) {
                const baseName = match[1];
                if (!groups[baseName]) {
                    groups[baseName] = [];
                }
                groups[baseName].push('imagens_produtos/' + imagePath);
            } else {
                const singleMatch = imagePath.match(/(.+?)\\.(jpg|jpeg|png)$/i);
                if (singleMatch) {
                    const baseName = singleMatch[1];
                    if (!groups[baseName]) {
                        groups[baseName] = [];
                    }
                    groups[baseName].push('imagens_produtos/' + imagePath);
                }
            }
        });
        
        Object.keys(groups).forEach(baseName => {
            groups[baseName].sort((a, b) => {
                const aMatch = a.match(/(\\d+)\\.(jpg|jpeg|png)$/i);
                const bMatch = b.match(/(\\d+)\\.(jpg|jpeg|png)$/i);
                const aNum = aMatch ? parseInt(aMatch[1]) : 0;
                const bNum = bMatch ? parseInt(bMatch[1]) : 0;
                return aNum - bNum;
            });
        });
        
        return groups;
    },
    
    findImagesForProduct: function(productName) {
        const groups = this.groupImagesByBaseName();
        
        let normalizedName = productName
            .toLowerCase()
            .replace(/['"]/g, '')
            .replace(/[()]/g, '')
            .replace(/\\d{2}-\\d{2}/g, '')
            .replace(/\\d{6,}[-\\s]?\\d{0,6}/g, '')
            .replace(/\\s+/g, '_')
            .replace(/[^\\w\\s-]/g, '')
            .trim();
        
        if (groups[normalizedName]) {
            return groups[normalizedName];
        }
        
        for (const groupName in groups) {
            const normalizedGroupName = groupName.toLowerCase()
                .replace(/[^\\w\\s-]/g, '')
                .replace(/\\s+/g, '_');
            
            if (normalizedGroupName.includes(normalizedName) || 
                normalizedName.includes(normalizedGroupName) ||
                this.calculateSimilarity(normalizedName, normalizedGroupName) > 0.7) {
                return groups[groupName];
            }
        }
        
        const keywords = this.extractKeywords(productName);
        for (const keyword of keywords) {
            for (const groupName in groups) {
                if (groupName.toLowerCase().includes(keyword.toLowerCase())) {
                    return groups[groupName];
                }
            }
        }
        
        return [];
    },
    
    extractKeywords: function(productName) {
        const words = productName.toLowerCase()
            .replace(/[^\\w\\s]/g, ' ')
            .split(/\\s+/)
            .filter(word => word.length > 2);
        
        const brands = ['nike', 'adidas', 'jordan', 'air', 'max', 'force', 'puma', 'gucci', 'lv', 'louis', 'vuitton', 'dior', 'versace'];
        const keywords = [];
        
        words.forEach(word => {
            if (brands.includes(word)) {
                keywords.push(word);
            }
        });
        
        words.forEach(word => {
            if (!keywords.includes(word) && word.length > 3) {
                keywords.push(word);
            }
        });
        
        return keywords;
    },
    
    calculateSimilarity: function(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    },
    
    levenshteinDistance: function(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
};
"@

    # Salvar o código gerado
    $jsCode | Out-File -FilePath (Join-Path $PSScriptRoot "image_scanner_generated.js") -Encoding UTF8
    
    # Salvar apenas a lista de imagens
    $imageList = @"
// Lista de imagens da pasta imagens_produtos
// Total: $($imageFiles.Count) arquivos
// Gerado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')

$($imageFiles -join "`n")
"@
    
    $imageList | Out-File -FilePath (Join-Path $PSScriptRoot "image_list.txt") -Encoding UTF8
    
    Write-Host "✅ Scan concluído!" -ForegroundColor Green
    Write-Host "📄 Arquivos gerados:" -ForegroundColor Cyan
    Write-Host "   - image_scanner_generated.js (código completo)" -ForegroundColor White
    Write-Host "   - image_list.txt (lista simples)" -ForegroundColor White
    Write-Host "📊 Total de imagens processadas: $($imageFiles.Count)" -ForegroundColor Green
    
    # Mostrar estatísticas
    $jpgCount = ($imageFiles | Where-Object { $_ -match '\.jpg$' }).Count
    $jpegCount = ($imageFiles | Where-Object { $_ -match '\.jpeg$' }).Count
    $pngCount = ($imageFiles | Where-Object { $_ -match '\.png$' }).Count
    
    Write-Host "📈 Estatísticas:" -ForegroundColor Cyan
    Write-Host "   - JPG: $jpgCount" -ForegroundColor White
    Write-Host "   - JPEG: $jpegCount" -ForegroundColor White
    Write-Host "   - PNG: $pngCount" -ForegroundColor White
    
} catch {
    Write-Host "❌ Erro ao escanear imagens: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
