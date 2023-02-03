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
import axios, { AxiosError } from 'axios';

import type { AuthApiData, AuthApiErrorData } from '@src/pages/api/auth';
import type { AccountBodyData } from '@src/types/account';
import type { ReturnTypeToJsend } from '@src/utils/toJsend';

export const AuthForm = () => {
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
        autoClose: 3000,
      });
    } catch (err) {
      const error = err as AxiosError<ReturnTypeToJsend<AuthApiErrorData>>;

      showNotification({
        id: 'login-error',
        title: 'Login Error',
        message: error.response?.data.data.message || 'Something went wrong!',
        autoClose: 3000,
        color: 'red',
      });
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
            () => alert('error'),
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
            required
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
