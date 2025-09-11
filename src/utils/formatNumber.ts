/**
 * @param num - 변환할 숫자
 * @returns 포맷된 문자열 (예: "1K+", "2K+", "999")
 */
export const formatNumberWithK = (num: number): string => {
  if (num >= 1000) {
    const value = Math.floor(num / 1000);
    return `${value}K+`;
  }
  return num.toString();
};
