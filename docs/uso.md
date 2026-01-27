# 📘 Como usar o `gupy-sync`

Abaixo estão os comandos disponíveis e suas flags, explicados de forma didática.

---
## 🔸 Flags disponíveis

### 1️⃣ ```--token <token>```
Passa um token para o programa, sem precisar de um .env no diretório aonde ele é executado.

###  2️⃣ ```--debug```
Exibe stack trace completo em caso de erro.


---

## 🔹 Comandos disponíveis

### 1️⃣ `importar-certificados`

Importa certificados do LinkedIn para a Gupy.

```bash
gupy-sync importar-certificados --csv <caminho_para_csv> [--dry-run]
```

O que faz:
- Autentica na Gupy usando seu token
- Substitui seus certificados da Gupy com os do LinkedIn (ou apenas mostra no --dry-run)
- Mostra mensagem de êxito

**Flags:**
- `--csv <path>` → Obrigatório. Caminho para o CSV exportado do LinkedIn.
- `--dry-run` → Opcional. Faz um "ensaio" da importação: o CLI vai validar e mostrar o payload final sem enviar nada para a Gupy.

Exemplo:
```bash
gupy-sync importar-certificados --csv ./Certifications.csv --dry-run
```
> ✅ Dica: use --dry-run primeiro para conferir se todos os dados foram analisados corretamente.

### 2️⃣ `mostrar-certificados`
Exibe os certificados atualmente cadastrados na Gupy.
```bash
gupy-sync mostrar-certificados
```
O que faz:
- Autentica na Gupy usando seu token
- Busca os certificados atuais
- Mostra o resultado no terminal

### 3️⃣ `mostrar-formacao`
Exibe a formação atualmente cadastrada na Gupy.
```bash
gupy-sync mostrar-formacao
```
O que faz:
- Autentica na Gupy usando seu token
- Busca as formações atuais
- Mostra o resultado no terminal

### 4️⃣ `mostrar-certificados-linkedin`
Exibe os certificados de um arquivo CSV do LinkedIn.
```bash
gupy-sync mostrar-certificados-linkedin --csv <caminho_para_csv>
```
**Flags:**
- `--csv <path>` → Obrigatório. Caminho para o CSV exportado do LinkedIn.

O que faz:
- Lê o arquivo CSV fornecido
- Exibe os certificados encontrados no formato processado

### 5️⃣ `mostrar-formacao-linkedin`
Exibe a formação acadêmica presente no CSV exportado do LinkedIn.
```bash
gupy-sync mostrar-formacao-linkedin --csv <caminho_para_csv>
```
**Flags:**
- `--csv <path>` → Obrigatório. Caminho para o CSV exportado do LinkedIn.

O que faz:
- Lê o arquivo CSV fornecido
- Exibe as formações encontradas no formato processado

### 6️⃣ `importar-formacao`

Substitui a formação acadêmica da Gupy pelos dados do LinkedIn.
```bash
gupy-sync importar-formacao --csv <caminho_para_csv> [--dry-run]
```
**Flags:**
- `--csv <path>` → Obrigatório. Caminho para o CSV exportado do LinkedIn.
- `--dry-run` → Opcional. Faz um "ensaio" da importação: o CLI vai validar e mostrar o payload final sem enviar nada para a Gupy.

**Exemplo:**
```bash
gupy-sync importar-formacao --csv ./Education.csv
```
O que faz:
- Normaliza os dados do CSV
- Pergunta interativamente caso algum curso não seja identificável automaticamente
- Envia a formação completa para a Gupy (ou apenas mostra no --dry-run)
- Mostra mensagem de êxito
