import { AtSignIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { formatPhone } from "@/shared/utils/format-phone";
import type { PublicEstablishment } from "../../data-access/get-public-establishment-by-slug";

type EstablishmentContactsProps = Pick<
  PublicEstablishment,
  "address" | "phone" | "instagram"
>;

const iconClassName = "size-icon-sm shrink-0 text-brand";
const linkClassName =
  "inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-fg";

/** Endereço, telefone e Instagram; cada um só aparece se estiver preenchido */
const EstablishmentContacts = ({
  address,
  phone,
  instagram,
}: EstablishmentContactsProps) => {
  if (!address && !phone && !instagram) {
    return null;
  }

  return (
    <address className="not-italic">
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-fg-secondary">
        {address && (
          <li className="inline-flex items-center gap-1.5">
            <MapPinIcon aria-hidden="true" className={iconClassName} />
            <span className="sr-only">Endereço: </span>
            {address}
          </li>
        )}

        {phone && (
          <li>
            <a href={`tel:+55${phone}`} className={linkClassName}>
              <PhoneIcon aria-hidden="true" className={iconClassName} />
              <span className="sr-only">Telefone: </span>
              <span className="tabular">{formatPhone(phone)}</span>
            </a>
          </li>
        )}

        {instagram && (
          <li>
            {/* Nova aba: o cliente não perde a página de agendamento */}
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener"
              className={linkClassName}
            >
              {/* O @ do ícone completa o usuário, que é guardado sem ele */}
              <AtSignIcon aria-hidden="true" className={iconClassName} />
              <span className="sr-only">Instagram: </span>
              {instagram}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        )}
      </ul>
    </address>
  );
};

export default EstablishmentContacts;
