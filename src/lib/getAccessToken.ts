'use server';

export const getAccessToken = async () => {
  const { cookies } = await import('next/headers');
  return (await cookies()).get('accessToken')?.value;
};
