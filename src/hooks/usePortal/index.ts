import { useEffect, useState } from 'react';

const usePortal = (id = 'tr-layout') => {
  const [portal, setPortal] = useState<HTMLElement | null>();

  useEffect(() => {
    const dom = document.getElementById(id);
    setPortal(dom);
  }, [id]);

  return { portal };
};

export default usePortal;
