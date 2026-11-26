"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="organization"
          placeholder="Ex.: Barbearia Central"
          defaultValue={state.values?.name}
          disabled={isPending}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? "name-error" : undefined}
          required
        />
        {nameError && (
          <p id="name-error" className="text-xs text-danger">
            {nameError}
          </p>
        )}
      </div>

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
