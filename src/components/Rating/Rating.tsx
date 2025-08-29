import { cn } from '@/lib/cn';
import { HTMLAttributes, useState } from 'react';
import RatingStar from './RatingStar';
import { RatingStarSize } from '@/types/rating.types';

/**
 * 총 Rating에 대한 상수
 */
const TOTAL_RATING = 5;

/**
 * 별점 컴포넌트의 props를 정의하는 인터페이스
 * @augments {HTMLAttributes<HTMLDivElement>}
 */
interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Rating 컴포넌트의 최상위 컨테이너에 적용할 Tailwind CSS 클래스
   */
  className?: string;
  /**
   * 개별 별 아이콘에 적용할 Tailwind CSS 클래스
   */
  starClassName?: string;
  /**
   * 컴포넌트가 렌더링될 별점을 설정
   * 사용자가 클릭하여 별점을 변경하기 전까지의 기본값으로 사용
   */
  rating: number;
  /**
   * 별 아이콘의 크기를 지정
   * 'sm' (작게) 또는 'md' (중간) 중 하나를 선택할 수 있음
   * 각 크기는 반응형 디자인이 적용되어있음
   */
  size?: RatingStarSize;
  /**
   * 컴포넌트를 읽기 전용 모드로 설정
   * true일 경우, 사용자의 클릭 및 마우스 오버 이벤트에 반응하지 않음
   */
  readonly?: boolean;
  /**
   * 사용자가 별점을 클릭하여 선택했을 때 호출되는 콜백 함수
   *
   * @param {number} newRating - 사용자가 선택한 새로운 별점 값 (1부터 5까지의 정수)
   */
  onRatingChange: (newRating: number) => void;
}
interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  starClassName?: string;
  rating: number;
  size?: RatingStarSize;
  readonly?: boolean;
  onRatingChange: (newRating: number) => void;
}

/**
 * 사용자의 별점 입력과 읽기 전용 모드를 지원하는 별점 컴포넌트<br>
 * @param {string} [className] - Rating 컴포넌트의 최상위 컨테이너에 적용할 Tailwind CSS 클래스<br>
 * @param {string} [starClassName] - 개별 별 아이콘에 적용할 Tailwind CSS 클래스<br>
 * @param {number} rating - 컴포넌트에 렌더링 될 별점을 설정<br>
 * @param {'sm' | 'md'} [size] - 별 아이콘의 크기를 지정합니다. 'sm' 또는 'md'를 선택할 수 있음<br>
 * @param {boolean} [readonly=false] - 컴포넌트를 읽기 전용 모드로 설정
 */
const Rating = ({
  className,
  starClassName,
  rating,
  size,
  readonly = false,
  onRatingChange,
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const baseStyle = 'inline-flex';

  const handleStarClick = (starIndex: number) => {
    onRatingChange(starIndex);
  };

  const handleMouseEnter = (starIndex: number) => {
    if (readonly) return;
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  return (
    <div className={cn(baseStyle, className)}>
      {[...Array(TOTAL_RATING)].map((_, index) => {
        const starIndex = index + 1;
        const effectiveRating = readonly ? rating : hoverRating || rating;
        const isActive = starIndex <= effectiveRating;
        const starState = isActive ? (readonly ? 'readonly' : 'active') : 'default';

        return (
          <button
            key={index}
            type='button'
            className={cn(readonly ? 'cursor-default' : 'cursor-pointer')}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <RatingStar className={starClassName} state={starState} size={size} />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
