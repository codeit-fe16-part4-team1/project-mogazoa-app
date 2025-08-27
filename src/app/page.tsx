import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import DropdownList from '@/components/Dropdown/DropdownList';

const Home = () => {
  return (
    <div className='flex justify-center p-10'>
      <Dropdown placeholder='카테고리 선택' size='mq'>
        <DropdownList>
          <DropdownItem label='음악' />
          <DropdownItem label='운동' />
          <DropdownItem label='게임' />
          <DropdownItem label='여행' />
          <DropdownItem label='스터디' />
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default Home;
