"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { Field } from "@/shared/components/ui/field/field";
import { InputField } from "@/shared/components/ui/field/input-field";
import { SelectField } from "@/shared/components/ui/field/select-field";
import { Input } from "@/shared/components/ui/input";
import { SLOT_MINUTES } from "@/shared/constants/slots";
import { formatDuration } from "@/shared/utils/format-duration";
import { SERVICE_DURATION_OPTIONS } from "../../constants/service-duration";
import type { ServiceListItem } from "../../data-access/get-services";
import { useServiceForm } from "../../hooks/use-service-form";
import { formatPriceInput } from "../../utils/format-price-input";

type ServiceFormProps = {
  /** Com serviço, edita; sem serviço, cria */
  service?: ServiceListItem;
  onSuccess: () => void;
};

const ServiceForm = ({ service, onSuccess }: ServiceFormProps) => {
  const {
    state,
    formAction,
    isPending,
    isEditing,
    nameError,
    durationError,
    priceError,
    formError,
  } = useServiceForm({ service, onSuccess });

  // Depois de um erro, repreenche com o que foi enviado
  const defaults = state.values ?? {
    name: service?.name ?? "",
    durationMinutes: String(service?.durationMinutes ?? SLOT_MINUTES),
    price: service ? formatPriceInput(service.priceCents) : "",
  };

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {formError && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {formError}
        </p>
      )}

      <InputField
        id="service-name"
        label="Nome"
        error={nameError}
        name="name"
        placeholder="Ex.: Corte masculino"
        maxLength={60}
        autoComplete="off"
        defaultValue={defaults.name}
        disabled={isPending}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id="service-duration"
          label="Duração"
          error={durationError}
          name="durationMinutes"
          defaultValue={defaults.durationMinutes}
          disabled={isPending}
          className="tabular"
        >
          {SERVICE_DURATION_OPTIONS.map((minutes) => (
            <option key={minutes} value={minutes}>
              {formatDuration(minutes)}
            </option>
          ))}
        </SelectField>

        <Field id="service-price" label="Preço" error={priceError}>
          {(control) => (
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-fg-muted"
              >
                R$
              </span>
              <Input
                {...control}
                name="price"
                inputMode="decimal"
                placeholder="0,00"
                autoComplete="off"
                defaultValue={defaults.price}
                disabled={isPending}
                className="pl-9 tabular"
                required
              />
            </div>
          )}
        </Field>
      </div>

      <DialogFooter className="pt-1">
        <DialogClose asChild>
          <Button type="button" variant="ghost" disabled={isPending}>
            Cancelar
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <LoaderCircle
              aria-hidden="true"
              className="size-icon-sm animate-spin"
            />
          )}
          {isEditing
            ? isPending
              ? "Salvando..."
              : "Salvar alterações"
            : isPending
              ? "Criando..."
              : "Criar serviço"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ServiceForm;
