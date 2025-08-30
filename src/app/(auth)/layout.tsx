import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const { cookies } = await import('next/headers');
  const token = (await cookies()).get('accessToken')?.value;

  if (token) {
    redirect('/');
  }

  return <>{children}</>;
};

export default AuthLayout;
