import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { getInitials } from "@/shared/utils/get-initials";
import type { PublicEstablishment } from "../../data-access/get-public-establishment-by-slug";
import EstablishmentContacts from "./establishment-contacts";
import { establishmentShell } from "./establishment-shell";

type EstablishmentProfileProps = {
  establishment: PublicEstablishment;
};

const styles = establishmentShell();

const EstablishmentProfile = ({ establishment }: EstablishmentProfileProps) => {
  const { name, description, address, phone, instagram } = establishment;

  return (
    <header className={styles.profile()}>
      {/* Decorativo: o nome vem logo abaixo, no h1 */}
      <Avatar aria-hidden="true" className={styles.avatar()}>
        <AvatarFallback className="bg-brand text-3xl text-brand-on">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className={styles.heading()}>
        <h1 className={styles.name()}>{name}</h1>
        {description && (
          <p className="text-pretty text-fg-secondary">{description}</p>
        )}
      </div>

      <EstablishmentContacts
        address={address}
        phone={phone}
        instagram={instagram}
      />
    </header>
  );
};

export default EstablishmentProfile;
