import { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const PaginationButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={clsx(className, 'layout-center size-7 rounded-full border-1 border-gray-300')}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
