import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center min-h-screen items-center w-full">
      {children}
    </main>
  );
};

export default Layout;
