interface Props {
  children: React.ReactNode;
}

const FormTitle = ({ children }: Props) => {
  return (
    <h1 className='font-cafe24-supermagic text-h2-bold mb-15 w-full text-center text-gray-800 md:mb-20 md:text-4xl'>
      {children}
    </h1>
  );
};

export default FormTitle;
