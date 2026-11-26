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

## Sobre

O **Bookora** é um app de agendamentos para salões, barbearias, clínicas e profissionais autônomos. Cada estabelecimento ganha uma página pública compartilhável, onde o cliente escolhe um serviço e um horário sem precisar criar conta. O dono acompanha tudo em um dashboard.

## Finalidade

- **Para o cliente final:** agendar em poucos passos pela página `usebookora.com.br/{slug}`.
- **Para o dono do estabelecimento:** cadastrar serviços, configurar horários de funcionamento, personalizar a página (cor e imagem de perfil) e visualizar a agenda.

## Produção

🔗 **https://usebookora.com.br**

## Estrutura do projeto

Um resumo de onde fica cada coisa. Os padrões de código (como escrever uma página, uma action, um hook) estão no [`AGENTS.md`](AGENTS.md).

```
usebookora/
  specs/            documentação do produto (visão geral e tokens de design)
  prisma/           schema e migrations do banco
  public/           arquivos estáticos (ícones, imagens da marca)
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
| `(booking)`              | `/{slug}`                                  | Público                          |
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
| `booking`    | `public-page`                      |
| `onboarding` | `home`, `establishment`            |
| `dashboard`  | `agenda`, `services`, `settings`   |

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
| `data-access`        | leituras usadas em várias telas: sessão, estabelecimento, plano                                            |
| `guards`             | proteção de acesso: exige login, exige estabelecimento...                                                  |
| `hooks`              | ligação entre forms e as actions de `shared/actions`                                                       |
| `actions`            | ações usadas em vários lugares (ex.: sair)                                                                 |
| `lib`                | configuração de serviços: auth (com o login por e-mail), banco, env, Stripe                                |
| `constants`          | valores globais: planos, tamanho dos slots, slugs reservados                                               |
| `types`              | declarações globais de tipos (ex.: sessão do Auth.js) e tipos de resultado das actions de `shared/actions` |
| `utils`              | funções de formatação e utilitários                                                                        |
| `styles`             | estilos globais e tokens de design                                                                         |

## Documentação

- Visão geral do produto: [specs/overview.md](specs/overview.md).
- Padrões de desenvolvimento: [AGENTS.md](AGENTS.md).
