import { categoryList } from '@/lib/categoryList';
import { createContext, useContext } from 'react';

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
}

const CategoryChip = ({ categoryId, className, children }: CategoryProps) => {
  return (
    <CategoryContext.Provider value={{ categoryId }}>
      <div className={className}>{children}</div>
    </CategoryContext.Provider>
  );
};

interface IconProps {
  className?: string;
}

const CategoryIcon = ({ className }: IconProps) => {
  const { categoryId } = useContext(CategoryContext);
  const IconComponent = categoryList.find((c) => c.id === categoryId)?.icon;
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
