import { useEffect } from 'react';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import Router from 'next/router';
import { Container } from '@mantine/core';

const Home = () => {
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) return;

    void Router.push('/account/login');
  }, [isLoggedIn]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}>
      <h1>Territories Page</h1>
    </Container>
  );
};

export default Home;

// TODO Try to implement this on SSR
