import type { ReactNode } from 'react';
import { HeaderComponent } from './HeaderComponent';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderComponent />
      <main>{children}</main>
    </>
  );
};
