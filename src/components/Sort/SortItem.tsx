import { cva, VariantProps } from 'class-variance-authority';

const sortItemVariants = cva('block cursor-pointer py-2.5 px-3 rounded-x1', {
  variants: {
    size: {
      S: 'text-body2',
      L: 'text-body2 md:text-body1',
    },
    isSelected: {
      true: 'bg-gray-900 text-white',
      false: 'bg-white text-gray-600 hover:bg-gray-150',
    },
  },
  compoundVariants: [
    {
      size: 'S',
      isSelected: true,
      className: 'text-body2-medium',
    },
    {
      size: 'L',
      isSelected: true,
      className: 'text-body1-medium',
    },
  ],
});

interface SortItemProps extends VariantProps<typeof sortItemVariants> {
  label: string;
  onClick?: () => void;
}

const SortItem = ({ label, onClick, size, isSelected }: SortItemProps) => {
  return (
    <div className={sortItemVariants({ size, isSelected })} onClick={onClick}>
      {label}
    </div>
  );
};

export default SortItem;
