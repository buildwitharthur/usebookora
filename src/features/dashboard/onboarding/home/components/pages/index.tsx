import React from "react";

const OnboardingPage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold">Bem-vindo ao Bookora!</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Sua conta foi criada com sucesso. Vamos configurar tudo para você
        começar a receber agendamentos.
      </p>
    </main>
  );
};

export default OnboardingPage;
