import { useCallback, useEffect, useState } from "react";

// Hook that performs `onIdle` when it is not "touched" for `timeout` milliseconds
const useIdle = ({ timeout, onIdle }) => {
  const [state, setState] = useState(Object.create(null));

  useEffect(() => {
    const t = setTimeout(onIdle, timeout);
    return () => clearTimeout(t);
  }, [onIdle, timeout, state]);

  const touch = useCallback(() => setState(Object.create(null)), []);
  return touch;
};

export default useIdle;
