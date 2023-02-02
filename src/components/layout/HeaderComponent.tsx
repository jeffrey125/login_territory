import { createStyles, Header, Container, Button } from '@mantine/core';
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
    marginBottom: 0,
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

  const imageClickHandler = () => {
    // TODO put the isAuthenticathed flag here to have a guard return

    void router.push('/');
  };

  const loginLogoutButton = () => {
    // TODO put the isAuthenticathed flag here to have a login logout logic

    void router.push('/account/login');
  };

  return (
    <Header height={60} sx={{ position: 'fixed', top: 0, borderBottom: 0 }}>
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
          onClick={imageClickHandler}
        />

        <Button
          size='md'
          color='green'
          role='button'
          component='a'
          onClick={loginLogoutButton}
          sx={{ width: 160 }}>
          Login
        </Button>
      </Container>
    </Header>
  );
};
