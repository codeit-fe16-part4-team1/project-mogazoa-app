import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import ProfileSection from '../components/ProfileSection';

const MyPage = async () => {
  const profile = await getMyProfileAPI();

  return (
    <div className='bg-gray-100'>
      <ProfileSection profile={profile} isMyProfile={true} />
      <ProductSection profileId={profile.id} />
    </div>
  );
};

export default MyPage;
