interface BadgeProps {
  isWinner: boolean;
  isTie: boolean;
}

const Badge = ({ isWinner, isTie }: BadgeProps) => {
  const badgeText = isWinner ? '이게 조아!👍🏻' : '둘다 조아!👍🏻';

  if (!isWinner && !isTie) {
    return null;
  }

  return (
    <div
      className='text-caption-bold md:text-body1-bold z-winner absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-2 whitespace-nowrap text-white md:px-4 md:py-2.5'
      style={{ backgroundImage: 'linear-gradient(to right, #9747FF, #6B79FA)' }}
    >
      {badgeText}
    </div>
  );
};

export default Badge;
