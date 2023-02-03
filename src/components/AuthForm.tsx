import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import isEmpty from 'validator/lib/isEmpty';
import axios from 'axios';

import type { AuthApiData, AuthApiErrorData } from '@src/pages/api/auth';
import type { AccountBodyData } from '@src/types/account';
import type { ReturnTypeToJsend } from '@src/utils/toJsend';
import type { AxiosError } from 'axios';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { useRouter } from 'next/router';

export const AuthForm = () => {
  const { setIsLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (user) => isEmpty(user.trim()) && 'Username cannot be empty!',
      password: (pass) => isEmpty(pass.trim()) && 'Password cannot be empty!',
    },
  });

  const loginHandler = async ({
    username,
    password,
  }: (typeof form)['values']) => {
    try {
      if (!form.isValid) return;

      showNotification({
        id: 'login',
        loading: true,
        title: 'Loading your data',
        message: 'Data will be loaded in 3 seconds, you cannot close this yet',
        autoClose: false,
        disallowClose: true,
      });

      const { data } = await axios.post<AuthApiData>('/api/auth', {
        username,
        password,
      });

      const userData = data as ReturnTypeToJsend<AccountBodyData>;

      updateNotification({
        loading: false,
        id: 'login',
        color: 'green',
        title: 'Login Successfully',
        message: `Welcome back ${userData.data.username}!`,
        autoClose: 2000,
      });
      form.reset();
      setIsLoggedIn(true);
      void router.push('/');
    } catch (err) {
      const error = err as AxiosError<ReturnTypeToJsend<AuthApiErrorData>>;

      updateNotification({
        id: 'login',
        title: 'Login Error',
        message: error.response?.data.data.message || 'Something went wrong!',
        autoClose: 2000,
        color: 'red',
      });
      setIsLoggedIn(false);
    }
  };

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
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `${theme.fontFamily || 'sans-serif'}`,
          fontWeight: 900,
        })}>
        Welcome back!
      </Title>

      <Paper
        withBorder
        shadow='md'
        p={30}
        mt={30}
        radius='md'
        sx={{ width: 420 }}>
        <form
          onSubmit={form.onSubmit(
            (userInput) => void loginHandler(userInput),
            () => {
              showNotification({
                id: 'login',
                color: 'red',
                title: 'Form Error',
                message: 'Invalid Form Input!',
                autoClose: 2000,
              });
            },
          )}>
          <TextInput
            label='Username'
            placeholder='Your Username Here'
            autoComplete='username'
            {...form.getInputProps('username')}
          />

          <PasswordInput
            label='Password'
            placeholder='Your Password Here'
            mt='md'
            autoComplete='current-password'
            {...form.getInputProps('password')}
          />

          <Button fullWidth type='submit' mt='xl'>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
