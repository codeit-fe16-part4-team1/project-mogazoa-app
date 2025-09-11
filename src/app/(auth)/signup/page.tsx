import { Metadata } from 'next';
import { headers } from 'next/headers';
import SignupForm from './SignupForm';

export async function generateMetadata(): Promise<Metadata> {
  // headers에서 현재 URL 가져오기
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/signup`;

  return {
    title: `회원가입`,
    description: 'mogazoa에 가입하고 상품 정보를 확인해보세요',
    openGraph: {
      title: '회원가입 | mogazoa',
      description: 'mogazoa에 가입하고 상품 정보를 확인해보세요',
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

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
