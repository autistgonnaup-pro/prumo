```markdown
# ⚛️ React + Vite SPA

Uma **Single Page Application (SPA)** moderna construída com **React** e **Vite**, focada em **performance e leveza**. O Vite oferece um servidor de desenvolvimento ultrarrápido com HMR (Hot Module Replacement) instantâneo e builds otimizados para produção.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão **18+** recomendada) — [Download](https://nodejs.org/)
- **Gerenciador de pacotes**: `npm` (incluso no Node.js), `yarn` ou `pnpm`

Para verificar as versões instaladas:

```bash
node -v
npm -v
```

---

## 🚀 Criando o projeto do zero

### 1️⃣ Crie o projeto com o template oficial do Vite

No terminal, execute:

```bash
npm create vite@latest meu-projeto-react
```

> 💡 Substitua `meu-projeto-react` pelo nome desejado para o seu projeto.

### 2️⃣ Escolha o framework e a variante

Durante a execução, o CLI interativo solicitará:

```text
? Select a framework: › React
? Select a variant: › JavaScript
```

> 💡 Escolha **JavaScript** ou **TypeScript** conforme sua preferência.

### 3️⃣ Acesse a pasta do projeto

```bash
cd meu-projeto-react
```

### 4️⃣ Instale as dependências

```bash
npm install
```

---

## 🧑‍💻 Rodando em ambiente de desenvolvimento

Inicie o servidor local do Vite:

```bash
npm run dev
```

O terminal exibirá um endereço (geralmente `http://localhost:5173/`). Abra no navegador e comece a desenvolver. As alterações são refletidas **instantaneamente** graças ao HMR.

---

## 📁 Estrutura de pastas sugerida

```text
meu-projeto-react/
├── public/                # Arquivos estáticos (favicon, robots.txt, etc.)
├── src/
│   ├── assets/            # Imagens, fontes e mídias importadas
│   ├── components/        # Componentes reutilizáveis (Button, Card, etc.)
│   ├── pages/             # Páginas/rotas da aplicação
│   ├── hooks/             # Custom hooks (useAuth, useFetch, etc.)
│   ├── services/          # Integrações com APIs e lógica externa
│   ├── utils/             # Funções auxiliares e helpers
│   ├── styles/            # Estilos globais e variáveis CSS
│   ├── App.jsx            # Componente raiz
│   └── main.jsx           # Ponto de entrada da aplicação
├── .gitignore
├── index.html             # HTML base (Vite injeta o bundle aqui)
├── package.json
└── vite.config.js         # Configurações do Vite
```

> 💡 **Dica:** mantenha a pasta `components` organizada por domínio (ex.: `components/ui/`, `components/layout/`) conforme o projeto crescer.

---

## ⚙️ Scripts principais do `package.json`

| Script          | Comando             | Descrição                                                                 |
| --------------- | ------------------- | ------------------------------------------------------------------------- |
| `dev`           | `npm run dev`       | Inicia o servidor de desenvolvimento com HMR e escuta em `localhost`.     |
| `build`         | `npm run build`     | Gera a build otimizada de produção na pasta `dist/` (minificado + bundle). |
| `preview`       | `npm run preview`   | Serve localmente a build de produção para validação antes do deploy.      |

### Exemplo de uso

```bash
# Ambiente local
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar a build
npm run preview
```

---

## 📚 Referências úteis

- [Documentação oficial do Vite](https://vitejs.dev/)
- [Documentação oficial do React](https://react.dev/)
- [Guia de deploy (Vite)](https://vitejs.dev/guide/static-deploy.html)

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para usá-lo, modificá-lo e distribuí-lo.
```