import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Header, Container, Button, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
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
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const matches = useMediaQuery('(min-width: 576px)');

  const imageClickHandler = () => {
    if (!isLoggedIn) return;

    void router.push('/');
  };

  const openLogoutModal = () =>
    openConfirmModal({
      centered: true,
      title: 'Do you want to logout?',
      children: (
        <Text size='sm'>
          After logging out you will be redirected again to the login page.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        setIsLoggedIn(false);
        void router.push('/account/login');

        showNotification({
          id: 'logout',
          title: 'Logout Successful!',
          message: 'Thank you for using our application!',
          autoClose: 2000,
          color: 'blue',
        });
      },
    });

  const loginHandler = () => {
    void router.push('/account/login');
  };

  return (
    <Header height={60} sx={{ position: 'fixed', top: 0, borderBottom: 0 }}>
      <Container
        className={classes.header}
        sx={
          matches
            ? { paddingLeft: 80, paddingRight: 80 }
            : { paddingLeft: 40, paddingRight: 40 }
        }>
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
          color={isLoggedIn ? 'red' : 'green'}
          role='button'
          component='a'
          onClick={isLoggedIn ? openLogoutModal : loginHandler}
          sx={{ width: matches ? 160 : 120 }}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Container>
    </Header>
  );
};
