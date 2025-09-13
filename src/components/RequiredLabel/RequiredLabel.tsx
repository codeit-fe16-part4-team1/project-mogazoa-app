interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

const RequiredLabel = ({ htmlFor, className, children, ...rest }: Props) => {
  return (
    <label htmlFor={htmlFor} className={className} {...rest}>
      <span className='text-red-700'>* </span>
      {children}
    </label>
  );
};

export default RequiredLabel;
