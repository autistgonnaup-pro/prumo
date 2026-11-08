# 🛠️ Guia de Referência de Comandos - Projeto Prumo

Este documento serve como um guia rápido de consulta para o gerenciamento de arquivos, execução do monitor do Supabase, manipulação de scripts e versionamento com Git.

---

## 📂 1. Estrutura e Manipulação de Arquivos e Pastas
*Utilize estes comandos para organizar a estrutura do projeto ou corrigir caminhos de importação direto pelo terminal.*

### Criar a pasta de páginas
Cria a pasta `pages` dentro do diretório `src`. O parâmetro `-Force` garante que o comando não falhe caso a pasta já exista.
```powershell
New-Item -ItemType Directory -Path "src/pages" -Force
```

### Criar um arquivo de teste rápido
Gera um arquivo chamado `Login.jsx` preenchido com a palavra "teste" dentro da pasta de páginas. Útil para validar se o monitor do Supabase está detectando novos arquivos.
```powershell
echo "teste" > src/pages/Login.jsx
```

### Alterar importações em massa dentro de um arquivo
Abre o arquivo `src\pages.jsx`, substitui todas as linhas que puxam componentes de `./pages/` para `./components/` e salva o arquivo automaticamente. Evita ter que alterar linha por linha manualmente.
```powershell
(Get-Content -Path "src\pages.jsx") -replace "from './pages/","from './components/" | Set-Content -Path "src\pages.jsx"
```

### Renomear arquivos ou pastas
Comando padrão do terminal para renomear qualquer arquivo ou diretório. Substitua pelos nomes reais que deseja alterar.
```powershell
ren nome_antigo.txt nome_novo.txt
```

---

## 🚀 2. Iniciar e Parar o Monitoramento de Arquivos
*Instruções para gerenciar o script `watch-files.js`, responsável por monitorar em tempo real as criações e exclusões de arquivos no seu computador.*

### Iniciar o monitoramento (Deixar rodando)
Executa o script que fica "escutando" as alterações nas pastas do projeto.
```bash
node watch-files.js
```
*Alternativa por atalho (Windows):* Caso prefira rodar em uma janela separada do CMD sem travar o terminal atual do VS Code:
```bash
start iniciar-monitor.bat
```

### Parar o monitoramento
Para encerrar o processo do monitor que está travando o terminal atual, clique dentro do terminal e pressione:
```text
Ctrl + C
```
*(Se iniciou pelo arquivo `.bat`, basta fechar a janela preta do prompt de comando).*

---

## 📋 3. Interagir com o Supabase via CLI
*Comandos para listar e testar a comunicação do script local com o banco de dados na nuvem.*

### Listar arquivos salvos no banco
Abra uma **nova aba** no terminal do VS Code e execute o comando abaixo para puxar e exibir tudo o que já foi registrado na tabela do Supabase:
```bash
node watch-files.js list
```

---

## 🧪 4. Testar Fluxos de Criação e Exclusão
*Passo a passo para validar se o monitoramento e a sincronização com o banco estão funcionando perfeitamente.*

1. Deixe o monitor rodando em uma aba do terminal (`node watch-files.js`).
2. Abra uma **segunda aba** no terminal e execute um dos comandos abaixo:

**Criar arquivo temporário para teste:**
```bash
echo "teste" > arquivo-teste.txt
```

**Excluir o arquivo temporário para testar a remoção:**
```bash
rm arquivo-teste.txt
```
*(Nota: No CMD tradicional do Windows, use `del arquivo-teste.txt` se o `rm` não funcionar).*

---

## 📦 5. Instalação e Dependências
*Comandos necessários ao clonar o projeto em uma nova máquina ou ao adicionar recursos de terceiros.*

### Instalar todas as dependências do projeto
Lê o arquivo `package.json` e instala tudo o que o projeto precisa para rodar.
```bash
npm install
```

### Instalar dependências específicas do monitor
Instala individualmente as bibliotecas necessárias para o script de monitoramento: variáveis de ambiente (`dotenv`), cliente do banco (`@supabase/supabase-js`) e o observador de arquivos (`chokidar`).
```bash
npm install dotenv @supabase/supabase-js chokidar
```

---

## 🔐 6. Segurança e Variáveis de Ambiente
*Regras cruciais para proteger as credenciais de acesso ao seu banco de dados.*

O arquivo `.env.local` guarda chaves secretas e **NUNCA** deve ser enviado para o GitHub. Certifique-se de que a linha `.env.local` está escrita dentro do seu arquivo `.gitignore`.

**Estrutura padrão necessária para o `.env.local`:**
```env
VITE_SUPABASE_URL="sua_url_do_projeto"
VITE_SUPABASE_PUBLISHABLE_KEY="sua_chave_publica"
SUPABASE_SECRET_KEY="sua_chave_secreta_aqui"
```

---

## 💾 7. Versionamento com Git
*Fluxo padrão de comandos para salvar o seu progresso de forma segura no histórico do Git.*

### 1. Verificar o status atual
Mostra quais arquivos foram criados, modificados ou deletados desde o seu último salvamento.
```bash
git status
```

### 2. Preparar os arquivos
Adiciona todas as modificações atuais para a lista de salvamento do próximo commit.
```bash
git add .
```

### 3. Salvar as alterações
Grava as alterações permanentemente no histórico com uma mensagem clara explicando o que foi feito.
```bash
git commit -m "feat: adiciona monitoramento de criacao e exclusao de arquivos"
```

---

## ⚠️ 8. Estrutura do Banco de Dados (SQL Editor)
*Caso precise resetar ou criar a tabela do monitor do zero, copie o código abaixo, abra o painel do Supabase na web, vá em **SQL Editor**, cole e execute.*

```sql
-- Cria a tabela que vai armazenar o registro dos novos arquivos detectados
create table public.arquivos_novos (
  id bigint generated by default as identity primary key,
  caminho text not null,
  criado_em timestamptz default now()
);

-- Segurança: Impede que o script tente registrar o mesmo caminho de arquivo duplicado
alter table public.arquivos_novos add constraint caminho_unico unique (caminho);
```
