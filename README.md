# Cinetag

**Cinetag** é uma aplicação web para catalogar e assistir vídeos e filmes. Você pode listar conteúdos da API, marcar favoritos e reproduzir vídeos em uma página dedicada.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [API Utilizada](#api-utilizada)
- [Componentes Principais](#componentes-principais)
- [Contexto de Favoritos](#contexto-de-favoritos)
- [Personalização](#personalização)

---

## Funcionalidades

- **Home (Início)**  
  Lista todos os vídeos disponíveis na API, exibidos em cards com capa e título.

- **Favoritos**  
  Página que mostra apenas os vídeos marcados como favoritos. É possível adicionar e remover favoritos clicando no ícone em cada card.

- **Player**  
  Ao clicar em um card, o usuário é levado à página do player (`/:id`), onde o vídeo é exibido em um iframe (YouTube, Vimeo etc.).

- **Página não encontrada**  
  Rota curinga para URLs inexistentes ou vídeos não encontrados, com mensagem amigável.

---

## Tecnologias

| Tecnologia        | Uso                          |
|-------------------|------------------------------|
| **React** 19.x    | Biblioteca UI                |
| **React Router DOM** 7.x | Roteamento SPA          |
| **CSS Modules**   | Estilos por componente       |
| **Create React App** | Tooling e build           |
| **ESLint**        | Linting (incl. react-hooks)  |

A fonte utilizada no projeto é **Montserrat** (Google Fonts), carregada em `public/index.html`.

---

## Estrutura do Projeto

```
cinetag/
├── public/
│   ├── index.html
│   └── imagens/
│       ├── banner-favoritos.png
│       ├── banner-home.png
│       └── banner-player.png
├── src/
│   ├── components/
│   │   ├── Banner/
│   │   ├── Cabecalho/
│   │   ├── CabecalhoLink/
│   │   ├── Card/
│   │   ├── Container/
│   │   ├── Rodape/
│   │   └── Titulo/
│   ├── contextos/
│   │   └── Favoritos.js
│   ├── pages/
│   │   ├── Favoritos/
│   │   ├── Inicio/
│   │   ├── NaoEncontrada/
│   │   ├── PaginaBase/
│   │   └── Player/
│   ├── index.js
│   ├── index.css
│   └── routes.js
├── package.json
└── README.md
```

- **`components/`** — Componentes reutilizáveis (Banner, Card, Cabecalho, Rodape etc.).
- **`contextos/`** — Context API para estado global (lista de favoritos).
- **`pages/`** — Páginas da aplicação (Inicio, Favoritos, Player, NaoEncontrada, PaginaBase).
- **`routes.js`** — Definição de rotas com React Router.
- **`index.js`** — Ponto de entrada que renderiza `AppRoutes`.

---

## Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **npm** (ou yarn/pnpm, ajustando os comandos abaixo)

---

## Instalação e Execução

1. **Clone o repositório** (ou acesse a pasta do projeto):

   ```bash
   cd cinetag
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm start
   ```

   A aplicação abrirá em [http://localhost:3000](http://localhost:3000). O navegador deve abrir automaticamente; em caso de alterações no código, a página será recarregada.

---

## Scripts Disponíveis

| Comando         | Descrição |
|-----------------|-----------|
| `npm start`     | Sobe o app em modo desenvolvimento em [http://localhost:3000](http://localhost:3000). |
| `npm run build` | Gera a build de produção na pasta `build/`. |
| `npm test`      | Executa os testes em modo interativo (Jest + React Testing Library). |
| `npm run eject` | Expõe a configuração do Create React App (operação irreversível). |

---

## Rotas da Aplicação

| Rota            | Componente     | Descrição |
|-----------------|----------------|-----------|
| `/`             | Inicio         | Página inicial com lista de vídeos. |
| `/favoritos`    | Favoritos      | Lista apenas os vídeos favoritados. |
| `/:id`          | Player         | Página do player do vídeo com o `id` informado. |
| `*`             | NaoEncontrada  | Qualquer outra URL exibe a página "não encontrada". |

Todas as rotas acima (exceto a curinga) são renderizadas dentro de **PaginaBase**, que inclui cabeçalho, container (com `Outlet`) e rodapé. O contexto de favoritos envolve o conteúdo para que todas as páginas filhas tenham acesso aos favoritos.

---

## API Utilizada

A aplicação consome uma API REST simulada com **JSON Server** no Typicode:

- **Base:** `https://my-json-server.typicode.com/GabrielBaldini1998/cinetag-api`
- **Listagem de vídeos:** `GET /videos`
- **Vídeo por ID:** `GET /videos?id={id}`

Cada vídeo esperado possui pelo menos: `id`, `titulo`, `capa`, `link` (URL do iframe do player).

---

## Componentes Principais

- **Banner** — Exibe uma imagem de fundo conforme a prop `imagem` (ex.: `"home"`, `"favoritos"`, `"player"`), usando as imagens em `public/imagens/`.
- **Cabecalho** — Logo (link para home) e navegação (Home, Favoritos) usando `CabecalhoLink`.
- **Card** — Exibe capa e título do vídeo, link para o player (`/:id`) e ícone de favoritar/desfavoritar.
- **Container** — Envolve o conteúdo principal das páginas.
- **Rodape** — Rodapé da aplicação.
- **Titulo** — Bloco para títulos de seção (ex.: "Um lugar para guardar seus vídeos e filmes!").

---

## Contexto de Favoritos

O estado dos favoritos é gerenciado em **`contextos/Favoritos.js`**:

- **FavoritosProvider** — Envolve a árvore (em **PaginaBase**) e fornece `favorito` (array) e `setFavorito`.
- **useFavoritoContext()** — Retorna `favorito` e a função `adicionarFavorito(novoFavorito)`.  
  - Se o item já estiver nos favoritos, ele é removido; caso contrário, é adicionado.

Os favoritos são mantidos apenas em memória (estado React); ao recarregar a página, a lista é resetada. Para persistência, seria necessário usar `localStorage` ou um backend.

---

## Personalização

- **Banners:** Troque as imagens em `public/imagens/` (`banner-home.png`, `banner-favoritos.png`, `banner-player.png`) ou altere a lógica em `Banner` para usar outros nomes/URLs.
- **API:** Para usar outra API, altere as URLs dos `fetch` em `pages/Inicio/index.js` e `pages/Player/index.js`.
- **Estilos:** Os estilos são feitos com CSS Modules (`.module.css`) em cada componente/página; edite os arquivos correspondentes para mudar o visual.
- **Fonte:** A fonte Montserrat é carregada em `public/index.html`; você pode trocar o link do Google Fonts e as referências em `index.css` ou nos módulos CSS.

---

## Licença

Projeto de uso educacional. Verifique os termos das dependências (React, React Router, etc.) conforme sua utilização.
