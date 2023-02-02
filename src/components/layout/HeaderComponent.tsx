import { createStyles, Header, Container } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    maxWidth: '100%',
    backgroundColor: theme.colors.blue[5],
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  logoImage: {
    borderRadius: '50%',
    cursor: 'pointer',
  },
}));

export const HeaderComponent = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Header height={60} mb={120}>
      <Container
        className={classes.header}
        sx={{ paddingLeft: 80, paddingRight: 80 }}>
        <Image
          priority
          src='/assets/images/logo.png'
          className={classes.logoImage}
          width={42}
          height={42}
          alt='My Logo'
          onClick={() => {
            // TODO put the isAuthenticathed flag here to have a guard return

            void router.push('/');
          }}
        />

        <button>Login</button>
      </Container>
    </Header>
  );
};
