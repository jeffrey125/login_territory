import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';

export const AuthForm = () => {
  // TODO USE REACT HOOK FORM HERE

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
        <TextInput label='Username' placeholder='Your Username Here' required />

        <PasswordInput
          label='Password'
          placeholder='Your Password Here'
          required
          mt='md'
        />

        <Button fullWidth mt='xl'>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};
