# Instalação

Existem três maneiras de instalar o Gupy LinkedIn Sync CLI:

- Buildando da source (GitHub)
- Baixando a release compilada (GitHub)
- Instalando via npm

> 🔐 Independente do método, você precisará de um [token da Gupy](./gupy-token.md). Ele pode ser configurado das duas formas:.
>1. Criando um arquivo `.env` no diretório onde o CLI será executado:
>```bash
>GUPY_TOKEN=seu_token_aqui
>```
>Ou passando diretamente no terminal com a flag `--token`:
>```bash
>gupy-sync --token <SEU_TOKEN_AQUI> mostrar-certificados 
>```
## Requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (vem com o Node)

Para verificar:
```bash
node -v
npm -v
```
#   1️⃣ Buildando da source (GitHub)
1. Clone o repositório
```bash
git clone https://github.com/enzoguinossi/gupy-linkedin-sync
cd gupy-linkedin-sync
```
2. Instale as dependências:
```bash
npm install
```
3. Compile/Build o projeto:
```bash 
npm run build
```
4. Executando o CLI:
   - Configure o token (opcional via .env ou flag --token)
      - Rodando localmente na pasta do projeto:
         ```bash
            # Usando a flag --token
            npx gupy-sync mostrar-certificados --token seu_token_aqui
            
            # Ou via .env (opcional)
            npx gupy-sync mostrar-certificados
        ```
      - Configurando para rodar globalmente
        ```bash
        npm link
        ```
        ```bash
        # Usando a flag --token
        gupy-sync --token <SEU_TOKEN_AQUI> mostrar-certificados 
        
        # Ou via .env (opcional)
        gupy-sync mostrar-certificados
        ```

# 2️⃣ Baixando a release compilada (GitHub)

1. Acesse a página de [releases do projeto](https://github.com/enzoguinossi/gupy-linkedin-sync/releases)
2. Baixe o arquivo da release desejado
3. Extraia o conteúdo em uma pasta de sua preferência
4. Executando o CLI:
    - Instale as dependências:
      ```bash
      npm install
      ```
    - Configure o token (opcional via .env ou flag --token)
      - Rodando localmente na pasta da release:
        ```bash
        # Usando a flag --token
        npx gupy-sync --token seu_token_aqui mostrar-certificados
              
        # Ou via .env (opcional)
        npx gupy-sync mostrar-certificados
        ```
      - Configurando para rodar globalmente
        ```bash
        npm link
        ```
        ```bash
        # Usando a flag --token
        gupy-sync --token <SEU_TOKEN_AQUI> mostrar-certificados 
          
        # Ou via .env (opcional)
        gupy-sync mostrar-certificados
        ```

# 3️⃣ Instalando via npm
```bash
npm install -g gupy-sync
```
```bash
# Usando a flag --token
gupy-sync --token <SEU_TOKEN_AQUI> mostrar-certificados 

# Ou via .env (opcional)
gupy-sync mostrar-certificados
```
