"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { InputField } from "@/shared/components/ui/field/input-field";
import { useCreateEstablishment } from "../../hooks/use-create-establishment";

const EstablishmentForm = () => {
  const { state, formAction, isPending, nameError, formError } =
    useCreateEstablishment();

  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      {formError && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {formError}
        </p>
      )}

      <InputField
        id="name"
        label="Nome"
        error={nameError}
        name="name"
        type="text"
        autoComplete="organization"
        placeholder="Ex.: Barbearia Central"
        defaultValue={state.values?.name}
        disabled={isPending}
        required
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle
              aria-hidden="true"
              className="size-icon-sm animate-spin"
            />
            Criando estabelecimento...
          </>
        ) : (
          <>
            Criar estabelecimento
            <ArrowRight aria-hidden="true" className="size-icon-sm" />
          </>
        )}
      </Button>
    </form>
  );
};

export default EstablishmentForm;
