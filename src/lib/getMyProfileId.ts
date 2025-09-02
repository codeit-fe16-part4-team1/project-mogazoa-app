'use server';

export const getMyProfileId = async () => {
  const { cookies } = await import('next/headers');
  const userId = (await cookies()).get('userId')?.value;
  return userId;
};
