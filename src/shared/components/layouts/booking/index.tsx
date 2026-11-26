import React from "react";
import BookingFooter from "./footer";
import BookingHeader from "./header";

type BookingLayoutProps = {
  children: React.ReactNode;
};

/**
 * Moldura do Bookora em volta da página pública. Fica fora do [data-brand]:
 * header e footer mantêm a cor do Bookora, e só a página usa a cor do
 * estabelecimento. A largura do conteúdo fica com a página.
 */
const BookingLayout = ({ children }: BookingLayoutProps) => {
  return (
    <>
      <BookingHeader />
      <main className="flex-1">{children}</main>
      <BookingFooter />
    </>
  );
};

export default BookingLayout;
