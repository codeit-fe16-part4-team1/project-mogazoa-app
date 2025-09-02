import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import ProfileSection from '../components/ProfileSection';
import { getMyProfileId } from '@/lib/getMyProfileId';

const MyPage = async () => {
  const profile = await getMyProfileAPI();
  const myProfileId = await getMyProfileId();
  console.log(`[DEBUG] My Profile Id: ${myProfileId}`);
  return (
    <div className='bg-gray-100'>
      <ProfileSection profile={profile} isMyProfile={true} />
      <ProductSection profileId={profile.id} />
    </div>
  );
};

export default MyPage;
