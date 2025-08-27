import Dropdown from '@/components/Dropdown/Dropdown';

const Home = () => {
  return (
    <div className='flex px-10 py-10'>
      <Dropdown placeholder='카테고리 선택' size='S'>
        <Dropdown.List>
          <Dropdown.Item label='음악' />
          <Dropdown.Item label='운동' />
          <Dropdown.Item label='게임' />
          <Dropdown.Item label='여행' />
          <Dropdown.Item label='스터디' />
        </Dropdown.List>
      </Dropdown>
    </div>
  );
};

export default Home;
