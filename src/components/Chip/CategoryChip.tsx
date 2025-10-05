'use client';
import { createContext, useContext } from 'react';

import { categoryList } from '@/lib/categoryList';

interface CategoryContextType {
  categoryId: number;
}

const CategoryContext = createContext<CategoryContextType>({
  categoryId: 0,
});

interface CategoryProps {
  categoryId: number;
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}

const CategoryChip = ({ categoryId, className, children, onClick, ...rest }: CategoryProps) => {
  return (
    <CategoryContext.Provider value={{ categoryId }}>
      <div className={className} onClick={onClick} {...rest}>
        {children}
      </div>
    </CategoryContext.Provider>
  );
};

interface IconProps {
  className?: string;
}

const CategoryIcon = ({ className }: IconProps) => {
  const { categoryId } = useContext(CategoryContext);
  const IconComponent = categoryList.find((c) => c.id === categoryId)?.icon;
  if (!IconComponent) return null; // 또는 기본 아이콘
  return <IconComponent className={className} />;
};

interface TextProps {
  className?: string;
}

const CategoryText = ({ className }: TextProps) => {
  const { categoryId } = useContext(CategoryContext);
  const categoryName = categoryList.find((c) => c.id === categoryId)?.name;
  return <span className={className}>{categoryName}</span>;
};

CategoryChip.icon = CategoryIcon;
CategoryChip.text = CategoryText;

export default CategoryChip;
