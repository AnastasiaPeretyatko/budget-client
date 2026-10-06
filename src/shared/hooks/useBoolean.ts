import { useState, useCallback } from 'react';

export type UseBooleanType = {
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export function useBoolean(initialValue = false): [boolean, UseBooleanType] {
  const [flag, setFlag] = useState(initialValue);

  const on = useCallback(() => setFlag(true), []);
  const off = useCallback(() => setFlag(false), []);
  const toggle = useCallback(() => setFlag(prev => !prev), []);

  return [flag, { on, off, toggle }];
}
