"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { InputField } from "@/shared/components/ui/field/input-field";
import { useGoogleLogin } from "../../hooks/use-google-login";
import { useMagicLinkLogin } from "../../hooks/use-magic-link-login";
import GoogleLoginButton from "./google-login-button";

const LoginForm = () => {
  const { state, formAction, isPending, emailError, formError } =
    useMagicLinkLogin();
  const google = useGoogleLogin();

  // Um fluxo em andamento bloqueia o outro
  const isAnyPending = isPending || google.isPending;
  const error = google.error ?? formError;

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {error}
        </p>
      )}

      <GoogleLoginButton
        formAction={google.formAction}
        isPending={google.isPending}
        disabled={isPending}
      />

      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <span className="text-xs text-fg-muted">ou com seu e-mail</span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} className="flex flex-col gap-3" noValidate>
        <InputField
          id="email"
          label="E-mail"
          error={emailError}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          defaultValue={state.values?.email}
          disabled={isAnyPending}
          required
        />

        <Button type="submit" className="w-full" disabled={isAnyPending}>
          {isPending ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="size-icon-sm animate-spin"
              />
              Enviando link...
            </>
          ) : (
            <>
              Enviar link de acesso
              <ArrowRight aria-hidden="true" className="size-icon-sm" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
