import ProfileSection from '../components/ProfileSection';
import { mockProfile } from '../mock/profile';

const MyPage = async () => {
  return (
    <div className='bg-gray-100'>
      <ProfileSection profile={mockProfile} />
    </div>
  );
};

export default MyPage;
