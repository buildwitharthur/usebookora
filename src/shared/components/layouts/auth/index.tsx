import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-90">{children}</div>
    </main>
  );
};

export default AuthLayout;
