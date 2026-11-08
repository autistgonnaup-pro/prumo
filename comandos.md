# 🛠️ Guia de Referência Rápida - Projeto Prumo

> **Dica de Visualização:** No VS Code, pressione `Ctrl + Shift + V` para abrir a versão formatada e limpa deste guia.

---

## 🚀 1. Atalhos Rápidos (Uso Diário)
*Os comandos essenciais para rodar, testar e salvar o seu progresso diariamente.*

### 📦 Buildar e Enviar para o GitHub (Tudo Automático)
Roda o build de produção do Vite, adiciona as alterações, cria o commit e envia para a branch principal de uma só vez:
```bash
npm run deploy
```
*💡 Nota: Caso queira usar mensagens personalizadas para cada envio em vez da mensagem padrão fixa do script, utilize a seção de **Versionamento Manual (Git)** deste guia.*

### ⚡ Abrir o Servidor Local de Desenvolvimento
Inicia o ambiente local do React/Vite para testar seu código no navegador:
```bash
npm run dev
```

---

## 📂 2. Manipular Arquivos, Pastas e Importações
*Comandos rápidos para organizar a estrutura do seu projeto direto pelo terminal PowerShell.*

### Criar uma Estrutura Completa de Arquivos (Exemplo: Componente Login)
Cria as pastas necessárias (caso não existam) e gera os arquivos vazios de uma única vez:
```powershell
New-Item -ItemType File -Path "src\components\Login\Login.js", "src\components\Login\Login.css", "src\components\Login\SocialButtons.js" -Force
```

### Criar uma Pasta Específica
```powershell
New-Item -ItemType Directory -Path "src\pages" -Force
```

### Renomear Qualquer Arquivo ou Pasta
```powershell
ren nome_antigo.txt nome_novo.txt
```

### Corrigir Importações em Massa (Substituir Texto)
Altera de forma automática todas as linhas que puxam componentes de `./pages/` para `./components/` dentro do arquivo selecionado:
```powershell
(Get-Content -Path "src\pages.jsx") -replace "from './pages/","from './components/" | Set-Content -Path "src\pages.jsx"
```

---

## 📡 3. Monitor de Arquivos & Supabase
*Instruções para gerenciar o script secundário `watch-files.js` que monitora as alterações do seu disco rígido.*

### Iniciar o Monitoramento
* **Opção 1 (No terminal atual):** `node watch-files.js`
* **Opção 2 (Janela externa separada):** `start iniciar-monitor.bat`

### Parar o Monitoramento
Clique dentro do terminal onde o monitor está travado e pressione a combinação:
```text
Ctrl + C
```

### Ver o que está Salvo no Banco de Dados
Abra uma **nova aba** no terminal do VS Code e consulte os registros atuais na tabela do Supabase:
```bash
node watch-files.js list
```

### Testar a Sincronização do Monitor com o Banco
Com o monitor ativo em uma aba, execute estes comandos em outra aba para testar se ele detecta as ações:
* **Criar arquivo de teste:** `echo "teste" > arquivo-teste.txt`
* **Deletar arquivo de teste:** `rm arquivo-teste.txt`

---

## 💾 4. Versionamento Manual com Git
*Utilize este fluxo quando quiser salvar o código com uma mensagem descritiva personalizada detalhando o que você alterou.*

### 1. Verificar o status atual das modificações
```bash
git status
```

### 2. Adicionar todas as alterações para o salvamento
```bash
git add .
```

### 3. Criar o ponto de salvamento com sua mensagem personalizada
```bash
git commit -m "feat: adiciona componente de botoes sociais no login"
```

### 4. Enviar os commits para o repositório no GitHub
```bash
git push origin main
```

---

## ⚠️ 5. Diagnóstico de Erros Comuns
*Consulte esta seção se algo parar de funcionar durante o desenvolvimento.*

### Erro: "Não é possível localizar o caminho... porque ele não existe"
* **Motivo:** Você tentou rodar um comando (como o de substituir texto ou renomear) em um arquivo que está dentro de uma subpasta, mas o terminal está procurando na raiz do projeto.
* **Solução:** Certifique-se de incluir a pasta correta no caminho (ex: usar `src\pages.jsx` em vez de apenas `pages.jsx`) ou use `ls` para verificar a estrutura de arquivos.

### Erro de Conexão ou Credenciais do Supabase
* **Motivo:** O arquivo `.env.local` está ausente, configurado incorretamente ou com nomes de variáveis trocados.
* **Solução:** Verifique se as variáveis coincidem perfeitamente com a estrutura abaixo:
```env
VITE_SUPABASE_URL="sua_url_do_projeto"
VITE_SUPABASE_PUBLISHABLE_KEY="sua_chave_publica"
SUPABASE_SECRET_KEY="sua_chave_secreta_aqui"
```

### O Script de Monitoramento não Detecta Novos Arquivos
* **Motivo:** O processo do Node pode ter travado em segundo plano ou o `chokidar` parou de responder.
* **Solução:** Pare o terminal com `Ctrl + C` e inicie novamente com `node watch-files.js`. Se o problema persistir, certifique-se de que a tabela no banco foi criada corretamente usando o script SQL abaixo.

---

## 📦 6. Instalação e Banco de Dados
*Comandos de manutenção geral do ambiente de desenvolvimento.*

### Instalar Todas as Dependências do Projeto
```bash
npm install
```

### Instalar Pacotes Exclusivos do Monitor de Arquivos
```bash
npm install dotenv @supabase/supabase-js chokidar
```

### Estrutura SQL para o Banco de Dados
Caso precise recriar a tabela do zero, copie este código e execute no **SQL Editor** do painel web do Supabase:
```sql
create table public.arquivos_novos (
  id bigint generated by default as identity primary key,
  caminho text not null,
  criado_em timestamptz default now()
);

-- Garante segurança impedindo registros duplicados para o mesmo arquivo
alter table public.arquivos_novos add constraint caminho_unico unique (caminho);
```
