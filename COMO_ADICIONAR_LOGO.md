# 🖼️ Como Adicionar o Logo STREETMOOD

## Passo 1: Preparar a Imagem

1. Certifica-te que a imagem está no formato **PNG** ou **JPG**
2. Recomendado: **PNG com fundo transparente** para melhor integração
3. Tamanho recomendado: **56x56px** (ou múltiplo, como 112x112px para melhor qualidade)

## Passo 2: Salvar a Imagem

1. Guarda a imagem com o nome: **`logo.png`** (ou `logo.jpg`)
2. Coloca a imagem na pasta: **`assets/images/`**
3. O caminho completo deve ser: **`assets/images/logo.png`**

## Passo 3: Verificar

1. Abre o ficheiro `index.html` no navegador
2. O logo deve aparecer no canto superior esquerdo do header
3. Se não aparecer, verifica:
   - ✅ O nome do ficheiro está correto? (`logo.png`)
   - ✅ O ficheiro está na pasta correta? (`assets/images/`)
   - ✅ O formato do ficheiro está correto? (PNG ou JPG)

## Estrutura de Pastas

```
STREETMOOD/
├── assets/
│   └── images/
│       └── logo.png  ← Coloca a imagem aqui
├── index.html
└── ...
```

## Notas

- Se a imagem não carregar, o sistema mostra "SM" como fallback
- O logo aparece dentro de um quadrado vermelho com gradiente
- A imagem é redimensionada automaticamente para caber no espaço

