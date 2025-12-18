# Instruções para Processar Imagens

## Situação Atual

O script `process_images.js` está pronto para processar todas as 593 imagens da pasta `imagens_produtos` e gerar o arquivo `streetmood_products.js` com todos os produtos.

**Porém, o Node.js não está instalado no sistema.**

## Opções para Processar as Imagens

### Opção 1: Instalar Node.js (Recomendado)

1. **Baixar Node.js:**
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS (Long Term Support)
   - Instale seguindo o assistente

2. **Verificar instalação:**
   ```bash
   node --version
   npm --version
   ```

3. **Executar o script:**
   ```bash
   node process_images.js
   ```
   
   Ou use o script batch:
   ```bash
   run_process_images.bat
   ```

### Opção 2: Usar PowerShell (Alternativa)

Se não puder instalar Node.js, você pode tentar executar o script PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\process_images.ps1
```

**Nota:** Pode ser necessário ajustar a política de execução do PowerShell.

## O que o Script Faz

1. ✅ Processa todas as 593 imagens da pasta `imagens_produtos`
2. ✅ Agrupa imagens por produto (mesmo nome base = mesmo produto)
3. ✅ Separa produtos com cores diferentes (azul vs preto = produtos diferentes)
4. ✅ Extrai tamanhos dos nomes e coloca no campo `size`
5. ✅ Remove tamanhos dos nomes dos produtos
6. ✅ Aplica os preços fornecidos (converte USD para EUR usando as margens)
7. ✅ Marca produtos "Mais Vendido" corretamente
8. ✅ Gera o arquivo `streetmood_products.js` com todos os produtos

## Produtos Mais Vendidos

Os seguintes produtos serão marcados como "Mais Vendido":
- CPFM x Nike Air Force 1
- New Balance 530
- NOCTA x Nike NSW Tech Fleece Sportswear set
- Nike NSW Tech Fleece Sportswear set
- casaco polo ralph lauren

## Após Processar

Depois de executar o script com sucesso:
1. O arquivo `streetmood_products.js` será atualizado
2. O site usará automaticamente as imagens dos produtos
3. A aba "Mais Vendido" mostrará os produtos corretos
4. Todos os produtos terão suas imagens associadas

## Verificação

Após executar o script, verifique:
- O arquivo `streetmood_products.js` foi atualizado
- Os produtos têm o campo `images` com array de imagens
- Os produtos têm o campo `isBestSeller` para os mais vendidos
- Os nomes dos produtos não têm tamanhos (tamanhos estão no campo `size`)

