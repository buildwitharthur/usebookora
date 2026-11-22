import EstablishmentForm from "../ui/establishment-form";

const EstablishmentPage = () => {
  return (
    <div className="flex w-full max-w-90 animate-slide-up flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="text-xl leading-tight font-semibold tracking-tight">
          Qual o nome do seu negócio?
        </h1>
        <p className="text-sm text-pretty text-fg-secondary">
          Ele aparece na sua página de agendamentos.
        </p>
      </header>

      <EstablishmentForm />
    </div>
  );
};

export default EstablishmentPage;
