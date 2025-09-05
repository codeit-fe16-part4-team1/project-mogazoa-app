'use server';

export const getUserInfo = async () => {
  const { cookies } = await import('next/headers');
  const userId = (await cookies()).get('userId')?.value;
  return {
    userId: Number(userId),
    isAuthenticated: !!userId,
  };
};
