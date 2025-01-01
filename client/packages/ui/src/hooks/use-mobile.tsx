'use client';

import * as React from 'react';

/**
 * 모바일 기기 여부를 확인하는 hook
 * @returns {boolean} 모바일 기기 여부 (768px 미만일 경우 true)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // 초기 상태 설정
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', checkIsMobile);

    // cleanup 함수
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}
