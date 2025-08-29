interface Props {
  text: string;
}

const Divider = ({ text }: Props) => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <div className='flex-1 border-b-1 border-gray-400' />
      <span className='text-gray-700'>{text}</span>
      <div className='flex-1 border-b-1 border-gray-400' />
    </div>
  );
};

export default Divider;
