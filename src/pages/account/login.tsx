import { AuthForm } from '@src/components/AuthForm';

const Login = () => {
  return (
    <section
      style={{ maxWidth: '100%' }}
      id='login-page'
      aria-label='Login Section'>
      <AuthForm />
    </section>
  );
};

export default Login;
