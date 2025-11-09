# STREETMOOD - Catálogo de Sneakers

Site moderno e funcional para a marca STREETMOOD, especializada em sneakers e streetwear.

## 🚀 Estrutura do Projeto

```
STREETMOOD/
├── index.html                    # Página principal do catálogo
├── streetmood_products.js        # Base de dados de produtos (351 produtos)
├── style.css                     # Estilos adicionais
├── assets/
│   ├── images/                   # Logo e imagens padrão
│   └── models/                   # Modelos 3D (opcional)
├── imagens_produtos/             # Imagens dos produtos
├── COMO_ADICIONAR_IMAGENS.md     # Guia para adicionar imagens
├── COMO_ADICIONAR_LOGO.md        # Guia para adicionar logo
├── MUDAR_CONTA_GITHUB.md         # Guia para mudar conta GitHub
├── upload-para-github.ps1        # Script para upload no GitHub
└── README.md                      # Este ficheiro
```

## 📋 Características

- ✅ Design moderno com modo escuro (#0a0a0a / #121212)
- ✅ Toques em vermelho vibrante (#e50914 / #ff1e1e)
- ✅ Cards de produtos com animações e hover effects
- ✅ Integração WhatsApp com mensagem automática
- ✅ Totalmente responsivo (mobile-first)
- ✅ Pesquisa e filtros avançados
- ✅ Paginação (20 produtos por página)
- ✅ Sistema de matching automático de imagens

## 🎨 Funcionalidades

### Catálogo de Produtos
- **351 produtos** disponíveis
- Grid responsivo de produtos
- Cards com efeitos de hover (zoom, brilho, sombra)
- Sistema de paginação
- Produtos com imagem aparecem primeiro

### Sistema de Ordenação
- **Todos (com imagem primeiro)**: Mostra todos os produtos, priorizando os que têm imagem
- **Mais recentes**: Ordena por ID (mais recente primeiro)
- **Ordenar por nome**: Ordenação alfabética
- **Preço: menor → maior**: Ordenação por preço crescente
- **Preço: maior → menor**: Ordenação por preço decrescente

### Sistema de Imagens
- Matching automático de imagens pelo nome do produto
- Cada imagem é associada a apenas 1 produto (melhor match)
- Suporte para imagens locais na pasta `imagens_produtos/`
- Placeholder automático para produtos sem imagem

### Modal Interativo
- Visualização de imagem do produto
- Detalhes do produto formatados (sem códigos, tamanhos formatados)
- Botão "Comprar via WhatsApp" com mensagem automática
- Botão "Reservar" com mensagem automática

## 📦 Instalação

1. Abre o ficheiro `index.html` no navegador
2. Ou usa um servidor local (VSCode Live Server, Python HTTP Server, etc.)

### Para adicionar imagens aos produtos:

1. Coloca a imagem na pasta `imagens_produtos/`
2. Nomeia a imagem com o nome do produto (ex: `Air Jordan 1 High University Blue.jpg`)
3. Adiciona o nome da imagem ao array `availableImages` no `index.html`
4. O sistema associa automaticamente a imagem ao produto pelo nome

**Ver guia completo:** `COMO_ADICIONAR_IMAGENS.md`

### Para adicionar logo:

1. Coloca a imagem do logo em `assets/images/logo.png`
2. O logo aparece automaticamente no header

**Ver guia completo:** `COMO_ADICIONAR_LOGO.md`

## 🔧 Configuração

### Adicionar Novos Produtos

Edita o ficheiro `streetmood_products.js`:

```javascript
{id: 352, name: "Nome do Produto", size: "36-45", tipo: "stock", price_eur: 51, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída."}
```

### Personalizar WhatsApp

O número de WhatsApp está configurado em `index.html`:
- Número: `351929461628`
- URL: `https://wa.me/351929461628`

### Personalizar Instagram

O Instagram está configurado em `index.html`:
- URL: `https://instagram.com/streetm00d_`

## 📱 Responsividade

O site é totalmente responsivo e adapta-se a:
- Telemóveis (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🎯 Tecnologias Utilizadas

- HTML5 / CSS3 / JavaScript
- TailwindCSS (via CDN)
- AOS.js (Animate On Scroll)
- Google Fonts (Inter)

## 🚀 Deploy

### GitHub Pages

1. Faz push do código para o GitHub
2. Vai a Settings → Pages
3. Seleciona a branch `main`
4. O site ficará disponível em: `https://USERNAME.github.io/REPOSITORY/`

**Ver guia completo:** `MUDAR_CONTA_GITHUB.md`

### Script de Upload

Usa o script PowerShell `upload-para-github.ps1` para fazer upload automático:

```powershell
.\upload-para-github.ps1
```

## 📝 Formato dos Produtos

Os produtos são exibidos com:
- **Nome formatado**: Códigos removidos (ex: `555088-134`)
- **Tamanhos formatados**: "T:36-40" → "tamanhos do 36 ao 40"
- **Preço em euros**: Formato `XX€`

## 📞 Contacto

- **Instagram**: [@streetm00d_](https://instagram.com/streetm00d_)
- **WhatsApp**: [+351 929 461 628](https://wa.me/351929461628)

## 📄 Licença

Este projeto foi criado para a marca STREETMOOD.

---

**Última atualização:** 351 produtos disponíveis
