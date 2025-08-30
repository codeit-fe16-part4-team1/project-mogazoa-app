interface Props {
  children: React.ReactNode;
}

const FormFieldContainer = ({ children }: Props) => {
  return <div className='flex flex-col gap-8'>{children}</div>;
};

export default FormFieldContainer;
