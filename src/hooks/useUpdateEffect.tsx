import { useEffect, useRef } from "react";

const useUpdateEffect = (callback: () => void, dependencies?: any[]) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    return callback();
  }, dependencies);
};

export default useUpdateEffect;
