"use client";

import { CheckIcon, ExternalLinkIcon, LinkIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type ShareActionsProps = {
  slug: string;
};

const COPIED_FEEDBACK_MS = 2000;

const ShareActions = ({ slug }: ShareActionsProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const path = `/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}${path}`);

    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="sm" className="max-sm:px-2">
            <a href={path} target="_blank" rel="noreferrer">
              <ExternalLinkIcon className="size-icon-sm" />
              <span className="max-sm:sr-only">Ver página</span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Abrir sua página pública</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="max-sm:px-2"
          >
            {copied ? (
              <CheckIcon className="size-icon-sm text-success" />
            ) : (
              <LinkIcon className="size-icon-sm" />
            )}
            <span className="max-sm:sr-only">
              {copied ? "Copiado" : "Copiar link"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>usebookora.com.br{path}</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ShareActions;
