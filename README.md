<p align="center">
  <img src="public/brand/logo-inverse.svg" alt="Bookora" width="280" />
</p>

<p align="center">
  Agendamentos simples para pequenos estabelecimentos.
</p>

<p align="center">
  <a href="https://usebookora.com.br"><strong>usebookora.com.br</strong></a>
</p>

---

## Apresentação

<p align="center">
  <img src="public/bookora.gif" alt="Apresentação do Bookora: página pública, escolha do horário, agenda e planos" width="100%" />
</p>

<p align="center">
  <a href="public/bookora.mp4">Assistir em MP4</a>
</p>

## Sobre

O **Bookora** é um app de agendamentos para salões, barbearias, clínicas e profissionais autônomos. Cada estabelecimento ganha uma página pública compartilhável, onde o cliente escolhe um serviço e um horário sem precisar criar conta. O dono acompanha tudo em um dashboard.

## Finalidade

- **Para o cliente final:** agendar em poucos passos pela página `usebookora.com.br/{slug}`.
- **Para o dono do estabelecimento:** cadastrar serviços, configurar horários de funcionamento, personalizar a página (cor e imagem de perfil) e visualizar a agenda.

## Produção

🔗 **https://usebookora.com.br**

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org) 20.9 ou mais novo
- [pnpm](https://pnpm.io): rode `corepack enable` para usar a versão definida no `package.json`
- [Docker](https://www.docker.com), para o Postgres local
- [Stripe CLI](https://docs.stripe.com/stripe-cli), para receber os webhooks da assinatura em dev
- Contas no [Resend](https://resend.com) (e-mail do login) e no [Stripe](https://stripe.com) (modo Test). O login com Google é opcional e precisa de um OAuth Client no Google Cloud.

### Passo a passo

1. Instale as dependências:

   ```sh
   pnpm install
   ```

2. Crie o `.env` a partir do exemplo e preencha as variáveis (cada uma tem um comentário explicando de onde vem):

   ```sh
   cp .env.example .env
   ```

   Em desenvolvimento:
   - `DATABASE_URL=postgresql://bookora:bookora@localhost:5432/bookora` (o banco do `compose.yml`);
   - `NEXT_PUBLIC_APP_URL=http://localhost:3000`;
   - `EMAIL_FROM` vazio usa o remetente de teste do Resend, que só entrega para o e-mail da sua conta Resend.

3. Suba o Postgres:

   ```sh
   docker compose up -d
   ```

4. Aplique as migrations (isso também gera o cliente do Prisma em `src/generated`):

   ```sh
   pnpm exec prisma migrate dev
   ```

5. Em outro terminal, encaminhe os webhooks do Stripe para o app. O comando mostra um `whsec_...`: copie para `STRIPE_WEBHOOK_SECRET` no `.env`.

   ```sh
   stripe login        # só na primeira vez
   pnpm stripe:listen
   ```

6. Rode o app e abra http://localhost:3000:

   ```sh
   pnpm dev
   ```

### Scripts

| Comando              | O que faz                                                 |
| -------------------- | --------------------------------------------------------- |
| `pnpm dev`           | servidor de desenvolvimento                               |
| `pnpm build`         | gera o cliente do Prisma e o build de produção            |
| `pnpm start`         | aplica as migrations pendentes e sobe o build de produção |
| `pnpm lint`          | ESLint                                                    |
| `pnpm format`        | formata com o Prettier (`pnpm format:check` só confere)   |
| `pnpm stripe:listen` | encaminha os eventos do Stripe para `/api/stripe/webhook` |

Antes de subir uma mudança, rode `pnpm exec tsc --noEmit`, `pnpm lint` e `pnpm format:check`.

### Produção

O deploy é no Coolify, com o build pack padrão (Nixpacks):

- **Build:** `pnpm build`
- **Start:** `pnpm start`, que já aplica as migrations pendentes antes de subir
- **Variáveis:** as mesmas do `.env.example`, com os valores de produção. Marque `DATABASE_URL` e `NEXT_PUBLIC_APP_URL` como disponíveis no build.
- **Webhook do Stripe:** endpoint `https://usebookora.com.br/api/stripe/webhook` no Dashboard do Stripe, com os eventos `checkout.session.completed` e `customer.subscription.created`, `.updated` e `.deleted`. O `whsec_` desse endpoint vai em `STRIPE_WEBHOOK_SECRET`.

## Estrutura do projeto

Um resumo de onde fica cada coisa. Os padrões de código (como escrever uma página, uma action, um hook) estão no [`AGENTS.md`](AGENTS.md).

```
usebookora/
  specs/            documentação do produto (visão geral e tokens de design)
  prisma/           schema e migrations do banco
  public/           arquivos estáticos (ícones, marca, fontes, imagem de compartilhamento, vídeo de apresentação)
  src/
    app/            rotas do Next.js: só páginas, layouts e metadata
    features/       o código de cada tela, por área e módulo
    shared/         o que é usado por mais de um módulo
    generated/      código gerado (cliente do Prisma), não editar
    proxy.ts        middleware de autenticação
  AGENTS.md         padrões de desenvolvimento
```

### `src/app`: rotas

As rotas ficam em grupos (as pastas entre parênteses não aparecem na URL):

| Grupo                    | Rotas                                      | Acesso                           |
| ------------------------ | ------------------------------------------ | -------------------------------- |
| `(landing)`              | `/`                                        | Público                          |
| `(auth)`                 | `/login`, `/login/verify`, `/login/error`  | Público                          |
| `(booking)`              | `/{slug}`, `/{slug}/{serviceId}`           | Público                          |
| `(protected)/onboarding` | `/onboarding`, `/onboarding/establishment` | Conta, ainda sem estabelecimento |
| `(protected)/dashboard`  | `/dashboard`, `/dashboard/...`             | Conta com estabelecimento        |
| `api/auth`               | rotas internas do login                    | Interno                          |
| `api/stripe/webhook`     | avisos do Stripe sobre a assinatura        | Interno (assinado pelo Stripe)   |

Cada `page.tsx` só define o título da página e aponta para a tela correspondente em `src/features/`.

### `src/features`: telas

Uma pasta por área, e dentro dela uma pasta por módulo (tela ou conjunto de telas):

| Área         | Módulos                            |
| ------------ | ---------------------------------- |
| `landing`    | `home`                             |
| `auth`       | `login`, `verify-request`, `error` |
| `booking`    | `public-page`, `schedule`          |
| `onboarding` | `home`, `establishment`            |
| `dashboard`  | `agenda`, `services`, `settings`   |
| `errors`     | `not-found`, `error`               |

Cada módulo separa o código por papel:

```
<módulo>/
  components/pages/   a tela em si
  components/ui/      as partes da tela
  actions/            o que grava dados (criar, editar, excluir)
  data-access/        o que lê dados
  hooks/              a ligação entre os forms e as actions
  schemas/            as regras de validação
  constants/ types/ utils/
```

### `src/shared`: código comum

| Pasta                | O que tem                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `components/ui`      | componentes base: botão, campo, dialog, menu, skeleton...                                                  |
| `components/layouts` | layouts das áreas: dashboard, auth, landing, onboarding, booking                                           |
| `data-access`        | leituras usadas em várias telas: sessão, estabelecimento, plano, agendamentos                              |
| `guards`             | proteção de acesso: exige login, exige estabelecimento...                                                  |
| `hooks`              | ligação entre forms e as actions de `shared/actions`                                                       |
| `actions`            | ações usadas em vários lugares (ex.: sair)                                                                 |
| `lib`                | configuração de serviços: auth (com o login por e-mail), banco, datas (dayjs), env, Stripe                 |
| `constants`          | valores globais: planos, tamanho dos slots, slugs reservados                                               |
| `types`              | declarações globais de tipos (ex.: sessão do Auth.js) e tipos de resultado das actions de `shared/actions` |
| `utils`              | funções de formatação e utilitários                                                                        |
| `styles`             | estilos globais e tokens de design                                                                         |

## Documentação

- Visão geral do produto: [specs/overview.md](specs/overview.md).
- Padrões de desenvolvimento: [AGENTS.md](AGENTS.md).
