"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const EstablishmentForm = () => {
  return (
    // TODO: ligar à action que cria o estabelecimento (gera slug e horários)
    <form className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="organization"
          placeholder="Ex.: Barbearia Central"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Criar estabelecimento
        <ArrowRight aria-hidden="true" className="size-icon-sm" />
      </Button>
    </form>
  );
};

export default EstablishmentForm;
