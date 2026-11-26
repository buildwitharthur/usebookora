import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

/** Estilos compartilhados pelo form e pelo skeleton, para não haver salto ao carregar */
export const settingsSection = tv({
  slots: {
    root: "overflow-hidden rounded-lg border border-border bg-surface shadow-xs",
    header: "flex flex-col gap-0.5 border-b border-border px-4 py-3 sm:px-5",
    title: "text-md font-semibold text-fg",
    description: "text-pretty text-fg-secondary",
    body: "flex flex-col gap-4 p-4 sm:p-5",
  },
});

const styles = settingsSection();

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <section className={styles.root()}>
      <header className={styles.header()}>
        <h2 className={styles.title()}>{title}</h2>
        <p className={styles.description()}>{description}</p>
      </header>

      <div className={styles.body()}>{children}</div>
    </section>
  );
};

export default SettingsSection;
