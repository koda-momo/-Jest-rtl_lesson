import { useState } from "react";

export const useCounter = (initialCount) => {
  const [count, setCount] = useState(initialCount);

  /**
   * 1足す.
   */
  const increment = () => {
    let number = count + 1;
    setCount(number);
  };

  /**
   * 1引く.
   */
  const decrement = () => {
    let number = count - 1;
    setCount(number);
  };

  /**
   * 2倍する.
   */
  const double = () => {
    let number = count * 2;
    setCount(number);
  };

  /**
   * 3倍する.
   */
  const triple = () => {
    let number = count * 3;
    setCount(number);
  };

  /**
   * リセット.
   */
  const reset = () => {
    setCount(0);
  };

  return { count, increment, decrement, double, triple, reset };
};
