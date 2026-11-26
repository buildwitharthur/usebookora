---
name: bookora-development
description: Padrões de desenvolvimento do Bookora. Use antes de criar ou alterar qualquer rota, feature, componente, action, hook, schema, data-access ou guard do projeto.
---

# Desenvolvimento no Bookora

## 1. Antes de qualquer decisão: consulte `specs/`

A pasta [`specs/`](specs/) é a fonte da verdade do produto. Leia-a antes de qualquer decisão, por menor que seja.

- [`specs/overview.md`](specs/overview.md): o que o produto faz, quem usa, planos e limites, slots, rotas.
- [`specs/assets/tokens.json`](specs/assets/tokens.json): tokens de design (espelhados em `src/shared/styles/globals.css`).

Se o pedido contradiz a spec, ou a spec não cobre o caso, **pare e pergunte**. Não escolha por conta própria.

## 2. Escopo: faça só o que foi pedido

- Implemente exatamente o que foi pedido, nada além.
- **Nunca invente** comportamento, campo, tela, regra de negócio, texto ou dependência que não foi pedido nem está na spec.
- **Nunca mude os padrões de código** descritos aqui. Se achar que um padrão deveria mudar, sugira e espere a decisão.
- Não refatore, renomeie nem "melhore" código fora do escopo do pedido.
- Se encontrar código antigo fora destes padrões, não o use como modelo: siga este documento.
- Na dúvida, pergunte antes de seguir.

## 3. Stack

Next.js (App Router, Server Components, Server Actions) · React 19 · TypeScript · Prisma (PostgreSQL) · Auth.js · Zod 4 · Tailwind CSS v4 com os tokens do projeto · `tailwind-variants` · Radix UI · `lucide-react` · pnpm.

Todo texto de interface, mensagem de erro e comentário é em **português**. URLs e nomes de código são em **inglês**.

## 4. Arquitetura

```
src/
  app/        só roteamento: page.tsx, layout.tsx, route.ts, metadata
  features/   o código de cada tela, agrupado por área e módulo
  shared/     o que é usado por mais de um módulo
  proxy.ts    middleware do Auth.js
```

- `src/app` não tem lógica nem JSX de tela. Ele aponta para a feature.
- O código de uma tela fica em `src/features/<área>/<módulo>/`.
- Só vai para `src/shared/` o que é usado por mais de um módulo.
- Imports: `@/shared/...` e `@/features/...` para fora do módulo, caminhos relativos (`../..`) dentro do módulo.

### Estrutura de um módulo

```
src/features/<área>/<módulo>/
  actions/        server actions, uma por arquivo
  components/
    pages/
      index.tsx   componente da página (o que o page.tsx exporta)
    ui/           componentes do módulo
  constants/      constantes do módulo
  data-access/    leituras do banco, uma função por arquivo
  hooks/          hooks de client que ligam um form à sua action
  schemas/        schemas zod, um por arquivo
  types/          tipos de resultado e estado das actions
  utils/          funções puras do módulo
```

Crie só as pastas que o módulo usa. Uma pasta vazia leva um `.gitkeep`.

### `src/shared/`

```
shared/
  actions/                     actions usadas em vários lugares
  components/
    layouts/<nome>/index.tsx   layouts (shell do dashboard, auth, landing...)
    ui/                        componentes base (Button, Input, Dialog, Skeleton...)
  constants/                   constantes globais (planos, slots)
  data-access/<contexto>/      DAL transversal (session, establishment, subscription)
  guards/<contexto>/           guards de sessão e acesso
  lib/<nome>/index.ts          clientes e configuração (auth, prisma, env...)
  styles/globals.css           tokens e estilos globais
  types/                       declarações globais de tipos (ex.: sessão do Auth.js)
  utils/                       funções puras globais
```

### Nomes de arquivos

- Arquivos em kebab-case, nomeados pelo que exportam: `getItems` → `get-items.ts`, `useItemForm` → `use-item-form.ts`, `ItemsTable` → `items-table.tsx`.
- Uma função (ou um componente) exportada por arquivo.
- Actions **sem** sufixo `-action` no arquivo (`create-item.ts`), mas o nome da função tem o sufixo (`createItemAction`).
- Schemas: `<ação>-<entidade>-schema.ts`. Constantes: `UPPER_SNAKE_CASE`.

## 5. Rotas

### Grupos de rota

| Grupo                    | Para quê                                      | Proteção                                 |
| ------------------------ | --------------------------------------------- | ---------------------------------------- |
| `(landing)`              | site público                                  | nenhuma                                  |
| `(auth)`                 | login e telas do fluxo de acesso              | nenhuma                                  |
| `(booking)`              | página pública do estabelecimento (`/[slug]`) | nenhuma (DAL pública)                    |
| `(protected)/dashboard`  | dashboard                                     | sessão + estabelecimento (no layout)     |
| `(protected)/onboarding` | primeiro acesso                               | sessão + sem estabelecimento (no layout) |

A proteção fica nos `layout.tsx` dos grupos, com guards. Uma página nova dentro de um grupo já herda a proteção dele: não repita o guard na página.

### `page.tsx`

O `page.tsx` só define a metadata e reexporta a página da feature:

```tsx
// src/app/(protected)/dashboard/items/page.tsx
import type { Metadata } from "next";
import ItemsPage from "@/features/dashboard/items/components/pages";

export const metadata: Metadata = {
  title: "Itens",
  description: "Uma frase sobre o que a página faz.",
  robots: { index: false, follow: false },
};

export default ItemsPage;
```

- `title` é só o nome da página: o layout raiz aplica o template `%s | Bookora`.
- Páginas privadas (dashboard, onboarding) usam `robots: { index: false, follow: false }`. Telas do fluxo de auth que não devem ser indexadas usam `robots: { index: false }`.
- Páginas públicas definem `alternates: { canonical: "/caminho" }`.
- Rotas dinâmicas usam `generateMetadata` com os tipos globais do Next:

```tsx
export const generateMetadata = async ({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  // ...
};
```

### `layout.tsx`

- Layout sem lógica reexporta o layout de `shared/components/layouts`:

  ```tsx
  import AuthLayout from "@/shared/components/layouts/auth";

  export default AuthLayout;
  ```

- Layout com proteção roda os guards e passa os dados para o layout compartilhado:

  ```tsx
  type ItemsLayoutProps = {
    children: React.ReactNode;
  };

  const ItemsLayout = async ({ children }: ItemsLayoutProps) => {
    await getSessionOrRedirect();

    return <SomeLayout>{children}</SomeLayout>;
  };

  export default ItemsLayout;
  ```

- Busque em paralelo o que não depende entre si (`Promise.all`).

### Navegação do dashboard

Toda página do dashboard tem uma entrada em `src/shared/components/layouts/shell/nav-items.ts`. Essa lista é a fonte única da navegação: alimenta a sidebar e o título da topbar. A página **não** renderiza um `<h1>` próprio, o título vem da topbar.

```ts
{ href: "/dashboard/items", label: "Itens", icon: SomeIcon },
```

## 6. Componentes

### Regras gerais

- Server Component por padrão. Use `"use client"` só quando o componente precisa de estado, efeitos, eventos ou hooks de client. Mantenha o client o mais "folha" possível.
- Componentes são `const` com arrow function e `export default` no fim do arquivo:

  ```tsx
  type ItemCardProps = {
    item: ItemListItem;
  };

  const ItemCard = ({ item }: ItemCardProps) => {
    return <div>{item.name}</div>;
  };

  export default ItemCard;
  ```

- Props tipadas com `type <Componente>Props`. Documente props não óbvias com `/** */`.
- Componentes base em `shared/components/ui/` são a exceção: usam export nomeado (`export const Button`), `data-slot`, `tailwind-variants` para variantes e `cn` para mesclar `className`.
- Use sempre os componentes de `shared/components/ui/` (Button, Input, Label, Dialog, AlertDialog, DropdownMenu, Skeleton...) antes de escrever um elemento estilizado na mão.
- Comentários explicam o **porquê** de uma decisão, não o que o código faz.

### Estilo

- Só existem as classes dos tokens do projeto (`globals.css` substitui as cores, raios, sombras etc. padrão do Tailwind). Use os nomes semânticos: `bg-canvas`, `bg-surface`, `text-fg`, `text-fg-secondary`, `text-fg-muted`, `border-border`, `text-danger`, `size-icon-sm`, `h-control-md`...
- Nunca use cores, tamanhos ou valores arbitrários fora dos tokens.
- Estilo que os tokens não cobrem (gradiente, sombra composta, transição de uma propriedade) vira um `@utility` nomeado em `src/shared/styles/globals.css`, montado com as variáveis dos tokens (ex.: `bg-glow-hero`, `surface-raised`, `transition-width`).
- Estilos com variantes ou partes (slots) usam `tv` do `tailwind-variants`. Classes condicionais usam `cn`.
- Números alinhados (preço, duração, horário) usam a classe `tabular`.

### Acessibilidade

- Erro geral de form: `<p role="alert">`.
- Campo com erro: `aria-invalid` no campo e `aria-describedby` apontando para o `id` da mensagem.
- Botão só com ícone: `aria-label`. Ícone decorativo: `aria-hidden="true"`.
- Carregamento: `aria-busy="true"` no container e um texto `sr-only` ("Carregando itens").
- Cabeçalhos de tabela com `scope="col"`; colunas sem texto visível levam um `sr-only`.

## 7. Carregamento de dados e Suspense

O componente da página (`components/pages/index.tsx`) é um Server Component **síncrono**: ele não busca dados. Ele monta o que aparece na hora (cabeçalho, botões) e envolve a parte com dados em um `Suspense`, com um skeleton de fallback:

```tsx
// components/pages/index.tsx
import { Suspense } from "react";
import ItemsData from "../ui/items-data";
import ItemsTableSkeleton from "../ui/items-table-skeleton";

const ItemsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <p className="text-pretty text-fg-secondary">Descrição curta.</p>
        {/* ações da página, ex.: botão que abre o dialog de criar */}
      </header>

      <Suspense fallback={<ItemsTableSkeleton />}>
        <ItemsData />
      </Suspense>
    </div>
  );
};

export default ItemsPage;
```

Quem busca é um Server Component async `<Entidade>Data`, que fica dentro do Suspense e decide entre o estado vazio e a lista:

```tsx
// components/ui/items-data.tsx
import { getItems } from "../../data-access/get-items";
import ItemsEmpty from "./items-empty";
import ItemsTable from "./items-table";

/** Busca os itens no servidor; fica dentro do Suspense da página */
const ItemsData = async () => {
  const items = await getItems();

  if (items.length === 0) {
    return <ItemsEmpty />;
  }

  return <ItemsTable items={items} />;
};

export default ItemsData;
```

- Cada bloco de dados independente tem o seu próprio `Suspense` e skeleton.
- Não use `loading.tsx` para dados de um bloco da página: use `Suspense` no componente da página.
- Depois de uma mutação, a action chama `revalidatePath` e a lista é buscada de novo pelo servidor. Não mantenha cópia da lista no client.

## 8. Padrão de listagem

Uma listagem tem estes arquivos em `components/ui/`:

| Arquivo                    | Tipo   | Papel                                                                   |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `items-data.tsx`           | server | busca e escolhe entre vazio e tabela                                    |
| `items-table-head.tsx`     | server | estilos `tv` compartilhados (`itemsTable`) + `<colgroup>` e `<thead>`   |
| `items-table.tsx`          | server | renderiza as linhas e o rodapé com a contagem                           |
| `items-table-skeleton.tsx` | server | mesmo `root`, `<thead>` e alturas da tabela, com `Skeleton` nas células |
| `items-empty.tsx`          | server | estado vazio, dentro do mesmo `root` da tabela                          |
| `item-row-actions.tsx`     | client | menu de ações da linha (editar, excluir)                                |

**Tabela, skeleton e vazio compartilham os estilos** de `items-table-head.tsx`, para não haver salto de layout quando os dados chegam:

```tsx
// components/ui/items-table-head.tsx
import { tv } from "tailwind-variants";

/** Estilos compartilhados pela tabela e pelo skeleton, para não haver salto ao carregar */
export const itemsTable = tv({
  slots: {
    root: "overflow-hidden rounded-lg border border-border bg-surface shadow-xs",
    table: "w-full table-fixed border-collapse text-sm",
    headCell: "h-9 px-3 text-left text-xs font-medium text-fg-muted first:pl-4",
    row: "h-10 border-t border-border",
    cell: "px-3 first:pl-4",
    footer: "border-t border-border bg-canvas px-4 py-2 text-xs text-fg-muted",
  },
});

const styles = itemsTable();

const ItemsTableHead = () => {
  return (
    <>
      <colgroup>
        <col />
        <col className="w-24" />
        <col className="w-12" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" className={styles.headCell()}>
            Item
          </th>
          <th scope="col" className={styles.headCell()}>
            Valor
          </th>
          <th scope="col" className={styles.headCell()}>
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
    </>
  );
};

export default ItemsTableHead;
```

- `const styles = itemsTable();` fica fora do componente.
- O skeleton usa algumas linhas com larguras variadas (ex.: `["w-3/5", "w-2/5", "w-1/2"]`) para não parecer uma grade repetida.
- O estado vazio explica o que é a lista e o que fazer em seguida, com texto curto.
- O rodapé mostra a contagem com plural correto (`1 item`, `2 itens`).
- Formatação de valores vem de `shared/utils` (`formatCurrency`, `formatDuration`...).
- O tipo da linha é derivado da DAL: `ItemListItem` (ver seção 13).

### Ações da linha

O menu da linha é client e abre os dialogs de editar e excluir:

```tsx
"use client";

const ItemRowActions = ({ item }: ItemRowActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Ações de ${item.name}`}
          >
            <EllipsisIcon className="size-icon-sm" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteItemDialog item={item}>
            {/* preventDefault: o menu continua montado enquanto a confirmação está aberta */}
            <DropdownMenuItem
              variant="danger"
              onSelect={(event) => event.preventDefault()}
            >
              Excluir
            </DropdownMenuItem>
          </DeleteItemDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Fora do menu: o menu fecha ao escolher "Editar" e levaria o dialog junto */}
      <ItemDialog item={item} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
};
```

## 9. Forms e dialogs

Um form com action tem três camadas, cada uma em seu arquivo:

1. **Dialog** (`item-dialog.tsx`, client): abre e fecha. Aceita um `children` como gatilho, ou `open`/`onOpenChange` para ser controlado de fora. O form fica dentro do `DialogContent`, então só existe com o dialog aberto e cada abertura começa limpa. Fecha no `onSuccess` do form.
2. **Form** (`item-form.tsx`, client): só JSX. Pega tudo do hook e não chama a action diretamente.
3. **Hook** (`use-item-form.ts`): liga o form à action (ver seção 12).

Criar e editar usam o mesmo dialog, form e hook: com a entidade na prop, edita; sem ela, cria.

```tsx
type ItemDialogProps = {
  /** Com item, edita; sem item, cria */
  item?: ItemListItem;
  /** Elemento que abre o dialog. Sem ele, controle pelo `open` (ex.: a partir de um menu) */
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ItemDialog = ({
  item,
  children,
  open: openProp,
  onOpenChange,
}: ItemDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Editar item" : "Novo item"}</DialogTitle>
          <DialogDescription>Uma frase sobre o efeito.</DialogDescription>
        </DialogHeader>
        <ItemForm item={item} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
```

Regras do form:

- `<form action={formAction} noValidate>`: a validação é a do zod, não a do navegador.
- Os campos têm `name` igual às chaves do schema e da constante `ITEM_FORM_FIELDS`.
- Campos não controlados (`defaultValue`). Depois de um erro, o `defaultValue` vem de `state.values`; senão, da entidade (edição) ou vazio (criação).
- Campos e botões ficam `disabled={isPending}`.
- O botão de enviar mostra `LoaderCircle` girando e um texto de progresso ("Salvando...").
- Cancelar é `<DialogClose asChild><Button type="button" variant="ghost">`.
- Ids não vão em `<input type="hidden">`: o hook recebe da prop.
- Exclusão usa `AlertDialog`, com o botão de confirmar sendo um `Button type="submit" variant="danger"` comum (não `AlertDialogAction`), para o dialog só fechar quando a exclusão terminar.

Erro geral e erro de campo seguem sempre este formato:

```tsx
{
  formError && (
    <p
      role="alert"
      className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
    >
      {formError}
    </p>
  );
}

<div className="flex flex-col gap-1.5">
  <Label htmlFor="item-name">Nome</Label>
  <Input
    id="item-name"
    name="name"
    defaultValue={defaults.name}
    disabled={isPending}
    aria-invalid={!!nameError}
    aria-describedby={nameError ? "item-name-error" : undefined}
  />
  {nameError && (
    <p id="item-name-error" className="text-xs text-danger">
      {nameError}
    </p>
  )}
</div>;
```

## 10. Schemas (zod)

- Toda validação passa por um schema zod, um por arquivo, em `schemas/`.
- O schema normaliza a entrada (trim, espaços, conversão de unidade) com `transform`/`coerce`, e as mensagens de erro são em português, prontas para o usuário.
- Cada schema exporta o tipo de entrada e o de saída:

```ts
// schemas/create-item-schema.ts
import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().trim().min(2, "O nome precisa ter pelo menos 2 caracteres."),
  amount: z.coerce.number("Informe o valor.").int().min(1, "Informe o valor."),
});

export type CreateItemInput = z.input<typeof createItemSchema>;
export type CreateItemOutput = z.output<typeof createItemSchema>;
```

- Schema de edição estende o de criação: `createItemSchema.extend({ id: z.cuid("Item inválido.") })`.

## 11. Server actions

- Assinatura: `(input: XInput) => Promise<XActionResult>`. A action **nunca** recebe `prevState` nem `FormData`: ler o form é trabalho do hook.
- A action sempre valida com `safeParse(input)`. O tipo do input não vale no servidor: qualquer cliente pode chamar a action com qualquer valor.
- O dono vem da sessão (`getCurrentEstablishmentOrThrow()` ou `getSessionOrThrow()`), nunca do input.
- Nunca chame `redirect()` dentro de uma action. A action retorna `{ success: true }` e o hook navega.
- Exceção: actions do Auth.js podem deixar o próprio `signIn`/`signOut` redirecionar pelo `redirectTo` (ex.: `signOutAction` em `shared/actions`). Quando o client precisa tratar o resultado antes de navegar (erro no form, URL externa), use `redirect: false` e navegue no hook.
- Erros de campo em `fieldErrors` (`z.flattenError(parsed.error).fieldErrors`), erro geral em `error`.
- A escrita no banco fica em `try/catch` com uma mensagem amigável.
- Depois de mudar dados de uma listagem, chame `revalidatePath` da rota.
- Funções auxiliares usadas só por esta action ficam **privadas no arquivo** dela, para o corpo da action ser uma sequência legível de passos.
- Função usada por duas ou mais actions vai para um arquivo próprio: leituras em `data-access/`, o resto em `actions/`.
- Consultas com `findUnique` pelas chaves `@unique`/`@@unique`, nunca `findFirst`. Checagens do tipo "exceto ele mesmo" comparam o id no código.
- Não trate condição de corrida (ex.: capturar P2002): uma checagem antes basta.

```ts
// actions/create-item.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getItemByName } from "../data-access/get-item-by-name";
import {
  type CreateItemInput,
  type CreateItemOutput,
  createItemSchema,
} from "../schemas/create-item-schema";
import type { ItemActionResult } from "../types/item-form-state";

const createItem = (
  establishmentId: string,
  { name, amount }: CreateItemOutput,
) => prisma.item.create({ data: { establishmentId, name, amount } });

export const createItemAction = async (
  input: CreateItemInput,
): Promise<ItemActionResult> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = createItemSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  if (await getItemByName(parsed.data.name)) {
    return { fieldErrors: { name: ["Já existe um item com esse nome."] } };
  }

  try {
    await createItem(establishment.id, parsed.data);
  } catch {
    return { error: "Não foi possível criar o item. Tente novamente." };
  }

  revalidatePath("/dashboard/items");

  return { success: true };
};
```

### Tipos de resultado

Ficam em `types/`, nunca exportados do arquivo da action. O estado do hook é o resultado mais os valores enviados:

```ts
// types/item-form-state.ts
import type { ITEM_FORM_FIELDS } from "../constants/item-form-fields";

/** Valores como digitados no form, guardados pelo hook para repreencher após erro */
export type ItemFormValues = Record<(typeof ITEM_FORM_FIELDS)[number], string>;

/** Retorno das actions de criar e editar item */
export type ItemActionResult = {
  success?: boolean;
  error?: string;
  fieldErrors?: { name?: string[]; amount?: string[] };
};

/** Estado do form: o retorno da action + o que foi enviado */
export type ItemFormState = ItemActionResult & { values?: ItemFormValues };
```

## 12. Hooks

O hook é dono do form. Ele tem uma função `onSubmit`, passada para `useActionState`, que:

1. lê o form com `getFormValues(formData, FIELDS)` (`src/shared/utils/get-form-values.ts`), nunca com `formData.get`;
2. junta o que vem de props (ex.: `id`);
3. chama a action com o input tipado;
4. em caso de erro, guarda os `values` enviados no estado (o React limpa o form depois do submit).

A lista de campos fica em `constants/<entidade>-form-fields.ts`:

```ts
/** Campos do form de item (criar e editar) */
export const ITEM_FORM_FIELDS = ["name", "amount"] as const;
```

```ts
// hooks/use-item-form.ts
"use client";

import { useActionState, useEffect, useEffectEvent } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { createItemAction } from "../actions/create-item";
import { updateItemAction } from "../actions/update-item";
import { ITEM_FORM_FIELDS } from "../constants/item-form-fields";
import type { ItemListItem } from "../data-access/get-items";
import type { ItemFormState } from "../types/item-form-state";

const initialState: ItemFormState = {};

type UseItemFormParams = {
  /** Com item, edita; sem item, cria */
  item?: ItemListItem;
  onSuccess: () => void;
};

export const useItemForm = ({ item, onSuccess }: UseItemFormParams) => {
  /** Lê o form e repassa o input tipado para a action de criar ou editar */
  const onSubmit = async (
    _prevState: ItemFormState,
    formData: FormData,
  ): Promise<ItemFormState> => {
    const values = getFormValues(formData, ITEM_FORM_FIELDS);

    const result = item
      ? await updateItemAction({ ...values, id: item.id })
      : await createItemAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  const handleSuccess = useEffectEvent(onSuccess);

  useEffect(() => {
    if (state.success) {
      handleSuccess();
    }
  }, [state]);

  return {
    state,
    formAction,
    isPending,
    isEditing: !!item,
    nameError: state.fieldErrors?.name?.[0],
    amountError: state.fieldErrors?.amount?.[0],
    formError: state.error,
  };
};
```

- O hook devolve o erro de cada campo já resolvido (`<campo>Error`) e o erro geral como `formError`.
- Callbacks de sucesso passam por `useEffectEvent` e rodam em `useEffect` sobre `state.success`.
- Navegação depois do sucesso: `router.push`/`router.replace` (`useRouter`) dentro desse `useEffect`. URL externa: `window.location.assign`.
- Quando o sucesso tira o componente da tela (navegação, linha excluída), mantenha bloqueado até sair: `isPending: isPending || !!state.success`.
- Form sem campos (ex.: confirmar exclusão) não lê o `FormData`:

  ```ts
  /** O form só confirma: o id vem da prop, não de um campo */
  const onSubmit = () => deleteItemAction({ id: itemId });
  ```

## 13. Data-access

- Todo arquivo começa com `import "server-only"`.
- Uma função por arquivo, com o nome da função em kebab-case.
- A função se protege sozinha: pega o dono pela sessão (`getCurrentEstablishmentOrThrow()`) e **nunca** recebe `userId` ou `establishmentId` como argumento. Assim não há como pedir dados de outro usuário.
- Leituras usadas na renderização usam `cache` do React para não repetir a consulta na mesma requisição.
- Selecione só os campos que a tela usa (`select`).
- Exporte o tipo da linha derivado da própria função:

```ts
// data-access/get-items.ts
import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Itens do estabelecimento do usuário logado, ordenados por nome */
export const getItems = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.item.findMany({
    where: { establishmentId: establishment.id },
    select: { id: true, name: true, amount: true },
    orderBy: { name: "asc" },
  });
});

export type ItemListItem = Awaited<ReturnType<typeof getItems>>[number];
```

- DAL de um módulo fica no módulo. Só o que é transversal vai para `src/shared/data-access/<contexto>/`.
- Páginas públicas (por slug) usam uma DAL separada e explicitamente pública.

## 14. Guards

Ficam em `src/shared/guards/<contexto>/`, um por arquivo, com `import "server-only"`.

| Nome                   | Onde usar                  | Sem acesso        |
| ---------------------- | -------------------------- | ----------------- |
| `get<X>OrRedirect`     | pages e layouts            | `redirect(...)`   |
| `get<X>OrThrow`        | server actions e DAL       | `throw new Error` |
| `redirectIf<Condição>` | layouts (bloqueio simples) | `redirect(...)`   |

## 15. Receitas

### Nova página no dashboard

1. Leia a spec da página em `specs/`.
2. Crie o módulo em `src/features/dashboard/<módulo>/` com `components/pages/index.tsx`.
3. Crie `src/app/(protected)/dashboard/<rota>/page.tsx` com a metadata e o reexport (seção 5).
4. Adicione a entrada em `nav-items.ts`.
5. Se a página mostra dados: DAL em `data-access/`, `Suspense` + `<Entidade>Data` + skeleton (seção 7).
6. Rode a verificação (seção 16).

### Listagem com criar, editar e excluir

1. Schemas `create-`, `update-` (estende o de criar com `id`) e `delete-<entidade>-schema.ts`.
2. DAL `get-<entidades>.ts` com o tipo `<Entidade>ListItem`.
3. `constants/<entidade>-form-fields.ts` e `types/` com os tipos de resultado e estado.
4. Actions `create-`, `update-` e `delete-<entidade>.ts`, com `revalidatePath`.
5. Hooks `use-<entidade>-form.ts` (criar e editar) e `use-delete-<entidade>.ts`.
6. Componentes: data, table-head, table, table-skeleton, empty, row-actions, dialog, form, delete-dialog, delete-form (seções 8 e 9).
7. Página com cabeçalho, botão "Novo <entidade>" abrindo o dialog e o `Suspense` da lista.
8. Rode a verificação (seção 16).

## 16. Depois de cada feature: verifique

Ao terminar uma feature, rode os comandos abaixo na raiz e corrija tudo o que falhar antes de dar a tarefa como concluída:

```sh
pnpm exec tsc --noEmit   # tipos
pnpm lint                # eslint
pnpm format:check        # prettier (corrija com: pnpm format)
```

Se algum comando falhar e a correção estiver fora do escopo do pedido, não corrija por conta própria: informe o que falhou e a saída do comando.

Antes de concluir, confira também se a documentação continua certa (seção 17).

## 17. Mantenha a documentação sincronizada com o código

A documentação faz parte da entrega. Uma feature só está pronta quando `specs/`, o `README.md` e este `AGENTS.md` descrevem o código como ele ficou.

- **`specs/`**: atualize quando o pedido mudar o produto: uma rota nova, uma tela, uma regra de negócio, um limite de plano, um texto da spec que deixou de valer.
- **`README.md` → "Estrutura do projeto"**: atualize quando surgir ou sumir uma pasta de primeiro nível, um grupo de rotas, uma área de `features/` ou uma pasta de `shared/`.
- **`AGENTS.md`**: atualize quando o pedido criar ou mudar um padrão: um grupo de rotas novo, uma pasta nova no módulo, um componente base novo em `shared/components/ui`, uma convenção de nomes, um comando de verificação.

Exemplos:

- Criou o grupo `(admin)` com um layout protegido → adicione a linha na tabela de grupos (seção 5), a rota na tabela de rotas de `specs/overview.md` e o grupo em "Estrutura do projeto" do `README.md`.
- Criou a área `features/reports/` → adicione-a em "Estrutura do projeto" do `README.md`.
- Uma decisão do usuário mudou como as actions funcionam → reescreva a seção 11, incluindo o exemplo de código.

Regras:

- Atualize a documentação na mesma tarefa que mudou o código, nunca "depois".
- Documente o que existe no código, não o que pode vir a existir.
- Se o código e a documentação discordam e você não sabe qual está certo, pergunte antes de mudar qualquer um dos dois.
- Ao terminar, diga ao usuário quais documentos você atualizou.
