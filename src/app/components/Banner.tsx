const Banner = () => {
  return (
    <div
      className='bg-primary-orange-600 layout-center font-cafe24-supermagic h-17'
      style={{
        backgroundImage: 'url(/images/banner_pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <h1 className='text-h4-bold md:text-h3-bold text-white'>
        모가조아에서 지금 핫한 상품을 비교해보세요! 🚀
      </h1>
    </div>
  );
};

export default Banner;
