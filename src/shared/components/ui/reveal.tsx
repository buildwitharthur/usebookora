"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

const revealVariants = tv({
  variants: {
    animation: {
      "fade-in": "",
      "slide-up": "",
      "scale-in": "",
    },
    visible: {
      true: "",
      false: "opacity-0",
    },
  },
  compoundVariants: [
    { visible: true, animation: "fade-in", class: "animate-fade-in" },
    { visible: true, animation: "slide-up", class: "animate-slide-up" },
    { visible: true, animation: "scale-in", class: "animate-scale-in" },
  ],
  defaultVariants: {
    animation: "slide-up",
    visible: false,
  },
});

type RevealProps = Pick<VariantProps<typeof revealVariants>, "animation"> & {
  children: ReactNode;
  className?: string;
  /** Atraso da animação em ms, útil para escalonar itens de uma lista */
  delay?: number;
};

/** Anima o conteúdo com as animações do design system quando ele entra na tela */
const Reveal = ({ children, className, delay = 0, animation }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(revealVariants({ animation, visible }), className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
