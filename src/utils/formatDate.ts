/**
 * ISO 8601 형식의 날짜 문자열을 한국어 날짜 형식(YYYY. M. D.)으로 변환
 * @param {string} dateString - '2025-08-30T04:02:01.676Z'와 같은 날짜 문자열
 * @returns {string} - '2025. 8. 30.'과 같은 형식의 문자열
 */
export const formatDate = (dateString: string) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  // 날짜 유효성 검사
  if (isNaN(date.getTime())) {
    console.error('유효하지 않은 날짜 형식.');
    return '유효하지 않은 날짜';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
