import { useRef, useEffect } from "react";

const usePrevState = (state) => {
  const Ref = useRef(state);
  useEffect(() => {
    Ref.current = state;
  });
  return Ref.current;
};
export default usePrevState;
