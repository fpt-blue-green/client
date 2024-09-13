import { EffectCallback, useEffect } from 'react';

const useMount = (cb: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
};

export default useMount;
