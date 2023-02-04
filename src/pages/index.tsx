/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect } from 'react';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import Router from 'next/router';
import { Container, Text, LoadingOverlay } from '@mantine/core';
import { transformData } from '@src/utils/transformData';
import { useQuery } from 'react-query';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import type { TerritoriesData } from '@src/types/territories';
import type { AxiosError } from 'axios';
import { TerritoryList } from '@src/components/TerritoryList';

const Home = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const { data, isLoading } = useQuery({
    queryKey: 'get-territories',
    queryFn: async () => {
      const { data } = await axios<TerritoriesData>(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_BASE_API_ROUTE}/Territories/All`
          : '/api/territories',
        {
          headers: {
            Accept: '*/*',
          },
        },
      );

      const toTree = transformData(data.data);

      return toTree;
    },
    onError: (err: AxiosError) => {
      showNotification({
        id: 'getTerritory',
        title: 'Loading your data',
        message: err.status === 500 ? 'Something went wrong!' : err.message,
        autoClose: 3000,
      });

      void Router.push('/500');
    },
  });

  useEffect(() => {
    if (isLoggedIn) return;

    void Router.push('/account/login');
  }, [isLoggedIn]);

  return isLoggedIn && !isLoading && data ? (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}>
      <Text component='h1' size={32}>
        Territories
      </Text>
      <TerritoryList territoryData={data} />
    </Container>
  ) : (
    <LoadingOverlay
      loaderProps={{ size: 'xl', color: 'blue', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayColor='#c5c5c5'
      visible
    />
  );
};

export default Home;
