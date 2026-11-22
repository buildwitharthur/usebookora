# Bookora — Visão Geral

O **Bookora** é um app simples de agendamentos para pequenos estabelecimentos (salões, barbearias, clínicas, autônomos). Cada estabelecimento tem uma página pública compartilhável, onde o cliente agenda um serviço. O dono acompanha tudo em um dashboard.

- **Domínio:** `usebookora.com.br`
- **URLs em inglês**, página pública em `usebookora.com.br/{slug}`
- Documento agnóstico de tecnologia: descreve o que o produto faz, não como é construído.

## Quem usa

| Quem                        | O que faz                                                                |
| --------------------------- | ------------------------------------------------------------------------ |
| **Dono do estabelecimento** | Tem conta e plano. Configura o negócio, cadastra serviços e vê a agenda. |
| **Cliente final**           | Agenda pela página pública. Não precisa de conta.                        |

## Acesso

- Existe uma única página de acesso: `/login`.
- Para usar o dashboard, o dono precisa de **conta** e de **plano ativo**. Sem plano, não acessa nada do dashboard.
- Quando o plano expira, a página pública fica **desabilitada**.
- Não há plano gratuito.

## Página pública (`/{slug}`)

- Mostra nome, descrição, endereço, contato, dias e horários de funcionamento e a lista de serviços (nome, duração e preço).
- O estabelecimento escolhe a **cor** da página e a **imagem de perfil**.
- Fluxo do cliente: escolhe o serviço, escolhe o horário, informa nome e telefone (e-mail opcional) e confirma. Depois vê uma **tela de agradecimento** com o resumo.
- O cliente só enxerga **hoje e amanhã**. Dias além disso não aparecem.
- Se o limite mensal do plano foi atingido, a página informa que não há horários disponíveis.

## Dashboard

- **Agenda:** agendamentos de hoje e de amanhã, com cliente, telefone, serviço e horário. Somente visualização.
- **Serviços:** criar, editar e excluir. Cada serviço tem nome, duração e preço. Excluir um serviço **apaga também os agendamentos dele**.
- **Configurações:** dados do estabelecimento, slug, cor, imagem de perfil, dias da semana e horários de funcionamento.
- **Plano:** plano atual, uso do mês, upgrade e downgrade.
- **Compartilhar:** botão para copiar o link da página pública.

## Slots e conflitos

- A agenda é dividida em **blocos de 30 minutos**.
- Cada serviço tem uma duração em múltiplos de 30 minutos e ocupa os slots consecutivos que precisa. Exemplo: 90 minutos ocupam 3 slots.
- Ao confirmar um agendamento, **os slots ocupados são marcados**, e ninguém mais consegue agendar neles.
- Um horário só é oferecido se o serviço couber inteiro em slots livres antes do fechamento.
- Só é possível agendar horários futuros, no fuso horário do estabelecimento.

## Planos

|                      | **Basic** | **Pro**    |
| -------------------- | --------- | ---------- |
| Serviços             | até 5     | ilimitados |
| Agendamentos por mês | até 100   | ilimitados |

- No Basic, o 6º serviço é bloqueado com sugestão de upgrade.
- A contagem de agendamentos reinicia todo mês. Ao chegar em 100, a página pública para de aceitar agendamentos até o mês seguinte ou um upgrade.
- Para fazer downgrade de Pro para Basic com mais de 5 serviços, o dono precisa antes excluir serviços até restarem 5.

## Rotas

| Rota                  | Acesso          | Descrição                                |
| --------------------- | --------------- | ---------------------------------------- |
| `/`                   | Público         | Landing page                             |
| `/login`              | Público         | Entrada e criação de conta               |
| `/{slug}`             | Público         | Página de agendamento do estabelecimento |
| `/dashboard`          | Conta com plano | Agenda                                   |
| `/dashboard/services` | Conta com plano | Serviços                                 |
| `/dashboard/settings` | Conta com plano | Configurações                            |
| `/dashboard/plan`     | Conta           | Plano e upgrade                          |

O slug é único e não pode coincidir com rotas do sistema (`login`, `dashboard`, `api` etc.).
