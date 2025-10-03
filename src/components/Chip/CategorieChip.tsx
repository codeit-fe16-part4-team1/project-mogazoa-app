import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { useCategoryMap } from '@/hooks/useCategoryMap';
import { cn } from '@/lib/cn';

const categorieChipVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-1 caption-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent text-[var(--dynamic-categorie-chip-text-color)] bg-[var(--dynamic-categorie-chip-bg-color)] [a&]:hover:bg-opacity-90',
        outline:
          'text-[var(--dynamic-categorie-chip-text-color)] border border-[var(--dynamic-categorie-chip-border-color)] ring ring-[var(--dynamic-categorie-chip-ring-color)] [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const CategorieChip = ({
  className,
  variant,
  asChild = false,
  categoryId,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof categorieChipVariants> & { asChild?: boolean } & { categoryId: number }) => {
  const Comp = asChild ? Slot : 'span';

  const { getCategoryIcon, getCategoryName } = useCategoryMap();

  const categoryName = getCategoryName(categoryId);
  const CategoryIcon = categoryName && getCategoryIcon(categoryName);

  return (
    <Comp
      data-slot='badge'
      className={cn(categorieChipVariants({ variant }), className)}
      {...props}
    >
      <span className='text-body1-bold md:text-h4-bold text-gray-900'>
        {getCategoryName(categoryId)}
      </span>
      {CategoryIcon && (
        <span className='size-5 text-gray-800 md:size-7'>
          <CategoryIcon />
        </span>
      )}
    </Comp>
  );
};

export { CategorieChip, categorieChipVariants };
