import { createStyles } from '@mantine/core';
import type { ReactNode } from 'react';
import { HeaderComponent } from './HeaderComponent';

const useStyles = createStyles(() => ({
  main: {
    width: '100%',
  },
}));

export const Layout = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();

  return (
    <>
      <HeaderComponent />
      <main className={classes.main}>{children}</main>
    </>
  );
};
