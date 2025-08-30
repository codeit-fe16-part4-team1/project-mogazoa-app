import { Button } from '@/components/Button/Button';

const ButtonTestPage = () => {
  return (
    <div className='ml-4 flex flex-col gap-4'>
      <Button intent='primary' size='L'>
        테스트 L
      </Button>
      <Button intent='primary' size='M'>
        테스트M
      </Button>
      <Button intent='primary' size='S'>
        테스트S
      </Button>
    </div>
  );
};

export default ButtonTestPage;
