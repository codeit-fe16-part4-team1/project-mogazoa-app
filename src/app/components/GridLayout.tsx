interface Props {
  children: React.ReactNode;
}

const GridLayout = ({ children }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
      {children}
    </div>
  );
};

export default GridLayout;
