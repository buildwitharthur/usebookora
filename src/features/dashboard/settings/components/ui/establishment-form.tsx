"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { BrandColor } from "@/generated/prisma/enums";
import { Button } from "@/shared/components/ui/button";
import { Field } from "@/shared/components/ui/field/field";
import { InputField } from "@/shared/components/ui/field/input-field";
import { SelectField } from "@/shared/components/ui/field/select-field";
import { TextareaField } from "@/shared/components/ui/field/textarea-field";
import { Input } from "@/shared/components/ui/input";
import { TIME_ZONE_OPTIONS } from "../../constants/time-zone-options";
import type { EstablishmentSettings } from "../../data-access/get-establishment-settings";
import { useEstablishmentForm } from "../../hooks/use-establishment-form";
import { formatPhone } from "@/shared/utils/format-phone";
import BrandColorField from "./brand-color-field";
import SettingsSection from "./settings-section";

type EstablishmentFormProps = {
  establishment: EstablishmentSettings;
};

const EstablishmentForm = ({ establishment }: EstablishmentFormProps) => {
  const {
    state,
    formAction,
    isPending,
    isSaved,
    nameError,
    descriptionError,
    addressError,
    phoneError,
    instagramError,
    slugError,
    brandColorError,
    timeZoneError,
    formError,
  } = useEstablishmentForm();

  // Depois de um erro, repreenche com o que foi enviado
  const defaults = state.values ?? {
    name: establishment.name,
    description: establishment.description ?? "",
    address: establishment.address ?? "",
    phone: establishment.phone ? formatPhone(establishment.phone) : "",
    instagram: establishment.instagram ?? "",
    slug: establishment.slug,
    brandColor: establishment.brandColor,
    timeZone: establishment.timeZone,
  };

  // Controlada para mostrar o nome da cor escolhida no rótulo
  const [brandColor, setBrandColor] = useState<BrandColor>(
    establishment.brandColor,
  );

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

      <SettingsSection
        title="Dados do estabelecimento"
        description="Aparecem para os clientes na sua página de agendamentos."
      >
        <InputField
          id="establishment-name"
          label="Nome"
          error={nameError}
          name="name"
          placeholder="Ex.: Barbearia Central"
          maxLength={60}
          autoComplete="organization"
          defaultValue={defaults.name}
          disabled={isPending}
          required
        />

        <TextareaField
          id="establishment-description"
          label="Descrição"
          error={descriptionError}
          name="description"
          placeholder="Ex.: Cortes clássicos e barba na navalha, no centro da cidade."
          maxLength={300}
          defaultValue={defaults.description}
          disabled={isPending}
        />

        <InputField
          id="establishment-address"
          label="Endereço"
          error={addressError}
          name="address"
          placeholder="Ex.: Rua das Flores, 123 - Centro, São Paulo/SP"
          maxLength={160}
          autoComplete="street-address"
          defaultValue={defaults.address}
          disabled={isPending}
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
          <InputField
            id="establishment-phone"
            label="Telefone"
            error={phoneError}
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="(11) 91234-5678"
            autoComplete="tel"
            defaultValue={defaults.phone}
            disabled={isPending}
            className="tabular"
          />

          <Field
            id="establishment-instagram"
            label="Instagram"
            error={instagramError}
          >
            {(control) => (
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-fg-muted"
                >
                  @
                </span>
                <Input
                  {...control}
                  name="instagram"
                  placeholder="seuperfil"
                  maxLength={31}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  defaultValue={defaults.instagram}
                  disabled={isPending}
                  className="pl-7"
                />
              </div>
            )}
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Página pública"
        description="O link que você compartilha e a cor da sua página."
      >
        <Field
          id="establishment-slug"
          label="Link"
          error={slugError}
          hint="Ao mudar, o link antigo deixa de funcionar."
        >
          {(control) => (
            <div className="flex">
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center rounded-l-md border border-r-0 border-border-strong bg-subtle px-3 text-sm text-fg-muted"
              >
                usebookora.com.br/
              </span>
              <Input
                {...control}
                name="slug"
                placeholder="barbearia-central"
                maxLength={60}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                defaultValue={defaults.slug}
                disabled={isPending}
                className="rounded-l-none"
                required
              />
            </div>
          )}
        </Field>

        <BrandColorField
          value={brandColor}
          onValueChange={setBrandColor}
          error={brandColorError}
          disabled={isPending}
        />
      </SettingsSection>

      <SettingsSection
        title="Agenda"
        description="O fuso horário dos seus agendamentos."
      >
        <SelectField
          id="establishment-time-zone"
          label="Fuso horário"
          error={timeZoneError}
          hint="Define o que é hoje e amanhã na agenda e na sua página."
          name="timeZone"
          defaultValue={defaults.timeZone}
          disabled={isPending}
        >
          {TIME_ZONE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </SettingsSection>

      <div className="flex items-center justify-end gap-3">
        <p role="status" className="text-sm text-success-fg">
          {isSaved ? "Alterações salvas." : ""}
        </p>

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <LoaderCircle
              aria-hidden="true"
              className="size-icon-sm animate-spin"
            />
          )}
          {isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
};

export default EstablishmentForm;
