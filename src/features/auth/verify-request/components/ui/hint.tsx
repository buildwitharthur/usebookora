import type { ReactNode } from "react";

type HintProps = {
  icon: ReactNode;
  children: ReactNode;
};

const Hint = ({ icon, children }: HintProps) => {
  return (
    <li className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-subtle text-fg-secondary">
        {icon}
      </span>
      <p className="pt-1.5 text-sm leading-snug text-fg-secondary text-pretty">
        {children}
      </p>
    </li>
  );
};

export default Hint;
