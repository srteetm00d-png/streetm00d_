// STREETMOOD - Auto Image Scanner
// Script para escanear automaticamente todas as imagens da pasta imagens_produtos
// e gerar a lista atualizada para o imageScanner

const fs = require('fs');
const path = require('path');

const imagensFolder = path.join(__dirname, 'imagens_produtos');

console.log('🔍 Escaneando pasta imagens_produtos...');

try {
    // Verificar se a pasta existe
    if (!fs.existsSync(imagensFolder)) {
        console.error('❌ Pasta imagens_produtos não encontrada!');
        process.exit(1);
    }

    // Ler todos os arquivos da pasta
    const files = fs.readdirSync(imagensFolder);
    
    // Filtrar apenas imagens
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    console.log(`📁 Encontrados ${imageFiles.length} arquivos de imagem`);

    // Gerar array para o imageScanner.knownImages
    const knownImages = imageFiles.map(file => file);

    // Gerar código JavaScript para copiar/colar
    const jsCode = `// STREETMOOD - Lista de imagens atualizada automaticamente
// Gerado em: ${new Date().toLocaleString('pt-PT')}
// Total de imagens: ${imageFiles.length}

const imageScanner = {
    // All product images from imagens_produtos folder
    knownImages: [
        ${knownImages.map(img => `        '${img}'`).join(',\n')}
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
};`;

    // Salvar o código gerado
    fs.writeFileSync(path.join(__dirname, 'image_scanner_generated.js'), jsCode);
    
    // Salvar apenas a lista de imagens
    const imageList = `// Lista de imagens da pasta imagens_produtos
// Total: ${imageFiles.length} arquivos
// Gerado em: ${new Date().toLocaleString('pt-PT')}

${imageFiles.map(file => file).join('\n')}`;
    
    fs.writeFileSync(path.join(__dirname, 'image_list.txt'), imageList);
    
    console.log('✅ Scan concluído!');
    console.log(`📄 Arquivos gerados:`);
    console.log(`   - image_scanner_generated.js (código completo)`);
    console.log(`   - image_list.txt (lista simples)`);
    console.log(`📊 Total de imagens processadas: ${imageFiles.length}`);
    
    // Mostrar estatísticas
    const jpgCount = imageFiles.filter(f => f.endsWith('.jpg')).length;
    const jpegCount = imageFiles.filter(f => f.endsWith('.jpeg')).length;
    const pngCount = imageFiles.filter(f => f.endsWith('.png')).length;
    
    console.log(`📈 Estatísticas:`);
    console.log(`   - JPG: ${jpgCount}`);
    console.log(`   - JPEG: ${jpegCount}`);
    console.log(`   - PNG: ${pngCount}`);
    
} catch (error) {
    console.error('❌ Erro ao escanear imagens:', error.message);
    process.exit(1);
}
