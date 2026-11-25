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
- Toda conta nasce no plano **Basic**, que funciona como **teste grátis** (sem cartão).
- Depois de assinar o **Pro** não existe downgrade: o Basic é só o ponto de partida.
- Se a assinatura do Pro não for renovada, o **dashboard e a página pública ficam indisponíveis** até a renovação. A conta não volta para o Basic.
- Assinar o Pro exige login: na landing, quem não está logado vai para o `/login`, e a assinatura é feita pelo menu da conta no dashboard.

## Página pública (`/{slug}`)

- Mostra nome, descrição, endereço, contato, dias e horários de funcionamento e a lista de serviços (nome, duração e preço).
- O estabelecimento escolhe a **cor** da página e a **imagem de perfil**.
- Fluxo do cliente: escolhe o serviço, escolhe o horário, informa nome e telefone (e-mail opcional) e confirma. Depois vê uma **tela de agradecimento** com o resumo.
- O cliente só enxerga **hoje e amanhã**. Dias além disso não aparecem.
- Se o limite de agendamentos do plano foi atingido, a página informa que não há horários disponíveis.

## Dashboard

- **Agenda:** agendamentos de hoje e de amanhã, com cliente, telefone, serviço e horário. Somente visualização.
- **Serviços:** criar, editar e excluir. Cada serviço tem nome, duração e preço. Excluir um serviço **apaga também os agendamentos dele**.
- **Configurações:** dados do estabelecimento, slug, cor, imagem de perfil, dias da semana e horários de funcionamento.
- **Plano:** plano atual e agendamentos usados na sidebar; upgrade e gerenciamento da assinatura no menu da conta.
- **Compartilhar:** botão para copiar o link da página pública.

## Slots e conflitos

- A agenda é dividida em **blocos de 30 minutos**.
- Cada serviço tem uma duração em múltiplos de 30 minutos e ocupa os slots consecutivos que precisa. Exemplo: 90 minutos ocupam 3 slots.
- Ao confirmar um agendamento, **os slots ocupados são marcados**, e ninguém mais consegue agendar neles.
- Um horário só é oferecido se o serviço couber inteiro em slots livres antes do fechamento.
- Só é possível agendar horários futuros, no fuso horário do estabelecimento.

## Planos

|              | **Basic**       | **Pro**      |
| ------------ | --------------- | ------------ |
| Serviços     | até 5           | ilimitados   |
| Agendamentos | até 100 (total) | ilimitados   |
| Preço        | teste grátis    | R$ 49,90/mês |

- No Basic, o 6º serviço é bloqueado com sugestão de upgrade.
- O limite de 100 agendamentos do Basic é **no total da conta** e não reinicia por mês. Ao chegar em 100, o teste acaba: a página pública para de aceitar agendamentos até a assinatura do Pro.

## Rotas

| Rota                  | Acesso  | Descrição                                |
| --------------------- | ------- | ---------------------------------------- |
| `/`                   | Público | Landing page                             |
| `/login`              | Público | Entrada e criação de conta               |
| `/{slug}`             | Público | Página de agendamento do estabelecimento |
| `/dashboard`          | Conta   | Agenda                                   |
| `/dashboard/services` | Conta   | Serviços                                 |
| `/dashboard/settings` | Conta   | Configurações                            |

O slug é único e não pode coincidir com rotas do sistema (`login`, `dashboard`, `api` etc.).
