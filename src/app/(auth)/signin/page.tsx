import { headers } from 'next/headers';
import { Metadata } from 'next';
import SigninForm from './SigninForm';

export async function generateMetadata(): Promise<Metadata> {
  // headers에서 현재 URL 가져오기
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/signin`;

  return {
    title: `로그인`,
    description: 'mogazoa에 로그인하고 상품 정보를 확인해보세요',
    openGraph: {
      title: '로그인 | mogazoa',
      description: 'mogazoa에 로그인하고 상품 정보를 확인해보세요',
      url: currentUrl,
      type: 'website',
      siteName: 'mogazoa',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

const SigninPage = () => {
  return <SigninForm />;
};

export default SigninPage;
