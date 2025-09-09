interface Props {
  children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return <div className='fullscreen bg-gray-100'>{children}</div>;
};

export default UserLayout;
