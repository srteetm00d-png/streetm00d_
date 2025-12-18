@echo off
echo ========================================
echo STREETMOOD - Processar Imagens
echo ========================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao esta instalado ou nao esta no PATH.
    echo.
    echo Por favor, instale o Node.js:
    echo 1. Acesse: https://nodejs.org/
    echo 2. Baixe e instale a versao LTS
    echo 3. Reinicie o terminal
    echo 4. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado!
node --version
echo.
echo Processando imagens...
echo.

node process_images.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCESSO] Processamento concluido!
    echo ========================================
    echo O arquivo streetmood_products.js foi gerado/atualizado.
    echo.
) else (
    echo.
    echo ========================================
    echo [ERRO] Ocorreu um erro durante o processamento.
    echo ========================================
    echo.
)

pause

