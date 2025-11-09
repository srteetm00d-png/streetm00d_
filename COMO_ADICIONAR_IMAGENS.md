# 📸 Como Adicionar Imagens aos Produtos

## Sistema Automático de Matching

O sistema associa automaticamente as imagens aos produtos pelo **nome**. Quando adicionas uma imagem na pasta `imagens_produtos`, ela é automaticamente associada ao produto com o nome correspondente.

## Como Funciona

1. **Adiciona a imagem** na pasta `imagens_produtos`
2. **Nomeia a imagem** com o nome do produto (ou similar)
3. **Adiciona o nome da imagem** ao array `availableImages` no `index.html`
4. O sistema **associa automaticamente** a imagem ao produto pelo nome
5. **Cada imagem** é associada a apenas **1 produto** (melhor match)

## Passo a Passo

### 1. Preparar a Imagem

- Formato: **JPG** ou **PNG**
- Nome: Use o nome do produto (ou similar)
- Exemplo: `Air Jordan 1 High University Blue.jpg`

### 2. Adicionar à Pasta

1. Coloca a imagem na pasta: **`imagens_produtos/`**
2. O caminho completo deve ser: **`imagens_produtos/Nome do Produto.jpg`**

### 3. Adicionar ao Array (Importante!)

1. Abre o ficheiro **`index.html`**
2. Encontra o array `availableImages` (por volta da linha 355)
3. Adiciona o nome da imagem ao array:

```javascript
const availableImages = [
    "Air Jordan 312_1.jpg",
    "Air Jordan 4 Retro_1.jpg",
    // ... outras imagens
    "Nome da Nova Imagem.jpg"  // ← Adiciona aqui
];
```

**Nota:** O nome no array deve ser **exatamente** igual ao nome do ficheiro na pasta.

### 4. Verificar Matching

O sistema faz matching automático baseado no nome:

- **Exact match**: Nome da imagem = Nome do produto
- **Partial match**: Nome da imagem contém palavras-chave do produto
- **Best match**: Sistema escolhe a melhor correspondência

### 5. Verificar no Site

1. Recarrega a página
2. A imagem deve aparecer automaticamente no produto correspondente
3. Se não aparecer, verifica se o nome está correto

## Exemplos

### Exemplo 1: Exact Match

**Produto:**
```javascript
{id: 36, name: "Air Jordans 1 High University Blue 555088-134", ...}
```

**Imagem:**
```
imagens_produtos/Air Jordan 1 High University Blue.jpg
```

✅ **Match perfeito** - A imagem será associada automaticamente

### Exemplo 2: Similar Name

**Produto:**
```javascript
{id: 36, name: "Air Jordans 1 High University Blue 555088-134", ...}
```

**Imagem:**
```
imagens_produtos/Air Jordans 1 High University Blue 555088-134_1.jpg
```

✅ **Match** - O sistema remove códigos e faz matching pelo nome base

## Regras Importantes

- ✅ **Uma imagem = Um produto**: Cada imagem é associada apenas a 1 produto
- ✅ **Best match first**: O sistema escolhe o melhor match disponível
- ✅ **Nome é importante**: O nome da imagem deve ser similar ao nome do produto
- ✅ **Formato**: JPG ou PNG
- ✅ **Localização**: Pasta `imagens_produtos/`

## Dicas

1. **Nomeia a imagem** com o nome do produto (sem códigos)
2. **Remove códigos** do nome da imagem (ex: `555088-134`)
3. **Usa nomes descritivos** (ex: `Air Jordan 1 High University Blue.jpg`)
4. **Evita caracteres especiais** no nome do ficheiro

## Verificar Matching

Se uma imagem não aparecer:

1. Verifica se o nome da imagem é similar ao nome do produto
2. Verifica se a imagem está na pasta correta
3. Verifica o console do navegador para mensagens de erro
4. Recarrega a página

## Estrutura de Pastas

```
STREETMOOD/
├── imagens_produtos/
│   ├── Air Jordan 1 High University Blue.jpg  ← Coloca aqui
│   ├── Air Jordan 4 Retro.jpg
│   └── ...
├── index.html
└── ...
```

