"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { BrandColor } from "@/generated/prisma/enums";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { TIME_ZONE_OPTIONS } from "../../constants/time-zone-options";
import type { EstablishmentSettings } from "../../data-access/get-establishment-settings";
import { useEstablishmentForm } from "../../hooks/use-establishment-form";
import { formatPhone } from "../../utils/format-phone";
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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="establishment-name">Nome</Label>
          <Input
            id="establishment-name"
            name="name"
            placeholder="Ex.: Barbearia Central"
            maxLength={60}
            autoComplete="organization"
            defaultValue={defaults.name}
            disabled={isPending}
            aria-invalid={!!nameError}
            aria-describedby={
              nameError ? "establishment-name-error" : undefined
            }
            required
          />
          {nameError && (
            <p id="establishment-name-error" className="text-xs text-danger">
              {nameError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="establishment-description">Descrição</Label>
          <Textarea
            id="establishment-description"
            name="description"
            placeholder="Ex.: Cortes clássicos e barba na navalha, no centro da cidade."
            maxLength={300}
            defaultValue={defaults.description}
            disabled={isPending}
            aria-invalid={!!descriptionError}
            aria-describedby={
              descriptionError ? "establishment-description-error" : undefined
            }
          />
          {descriptionError && (
            <p
              id="establishment-description-error"
              className="text-xs text-danger"
            >
              {descriptionError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="establishment-address">Endereço</Label>
          <Input
            id="establishment-address"
            name="address"
            placeholder="Ex.: Rua das Flores, 123 - Centro, São Paulo/SP"
            maxLength={160}
            autoComplete="street-address"
            defaultValue={defaults.address}
            disabled={isPending}
            aria-invalid={!!addressError}
            aria-describedby={
              addressError ? "establishment-address-error" : undefined
            }
          />
          {addressError && (
            <p id="establishment-address-error" className="text-xs text-danger">
              {addressError}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="establishment-phone">Telefone</Label>
            <Input
              id="establishment-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="(11) 91234-5678"
              autoComplete="tel"
              defaultValue={defaults.phone}
              disabled={isPending}
              aria-invalid={!!phoneError}
              aria-describedby={
                phoneError ? "establishment-phone-error" : undefined
              }
              className="tabular"
            />
            {phoneError && (
              <p id="establishment-phone-error" className="text-xs text-danger">
                {phoneError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="establishment-instagram">Instagram</Label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-fg-muted"
              >
                @
              </span>
              <Input
                id="establishment-instagram"
                name="instagram"
                placeholder="seuperfil"
                maxLength={31}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                defaultValue={defaults.instagram}
                disabled={isPending}
                aria-invalid={!!instagramError}
                aria-describedby={
                  instagramError ? "establishment-instagram-error" : undefined
                }
                className="pl-7"
              />
            </div>
            {instagramError && (
              <p
                id="establishment-instagram-error"
                className="text-xs text-danger"
              >
                {instagramError}
              </p>
            )}
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Página pública"
        description="O link que você compartilha e a cor da sua página."
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="establishment-slug">Link</Label>
          <div className="flex">
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center rounded-l-md border border-r-0 border-border-strong bg-subtle px-3 text-sm text-fg-muted"
            >
              usebookora.com.br/
            </span>
            <Input
              id="establishment-slug"
              name="slug"
              placeholder="barbearia-central"
              maxLength={60}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              defaultValue={defaults.slug}
              disabled={isPending}
              aria-invalid={!!slugError}
              aria-describedby={
                slugError
                  ? "establishment-slug-hint establishment-slug-error"
                  : "establishment-slug-hint"
              }
              className="rounded-l-none"
              required
            />
          </div>
          <p id="establishment-slug-hint" className="text-xs text-fg-muted">
            Ao mudar, o link antigo deixa de funcionar.
          </p>
          {slugError && (
            <p id="establishment-slug-error" className="text-xs text-danger">
              {slugError}
            </p>
          )}
        </div>

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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="establishment-time-zone">Fuso horário</Label>
          <Select
            id="establishment-time-zone"
            name="timeZone"
            defaultValue={defaults.timeZone}
            disabled={isPending}
            aria-invalid={!!timeZoneError}
            aria-describedby={
              timeZoneError
                ? "establishment-time-zone-hint establishment-time-zone-error"
                : "establishment-time-zone-hint"
            }
          >
            {TIME_ZONE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <p
            id="establishment-time-zone-hint"
            className="text-xs text-fg-muted"
          >
            Define o que é hoje e amanhã na agenda e na sua página.
          </p>
          {timeZoneError && (
            <p
              id="establishment-time-zone-error"
              className="text-xs text-danger"
            >
              {timeZoneError}
            </p>
          )}
        </div>
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
