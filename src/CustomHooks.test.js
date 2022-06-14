import { act, renderHook } from "@testing-library/react-hooks";
import { render, screen, cleanup } from "@testing-library/react";

//hooks
import { useCounter } from "./useCounter";

//itを使う度にレンダリングをする→再レンダリングの前に一旦前のレンダリング情報を削除
afterEach(() => cleanup());

describe("Hooksテスト", () => {
  it("初期値が正しく表示されるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);
  });

  it("正しく足し算が行われるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);

    //足し算のメソッドを実行する(中でsetStateを使っているのでactで囲む必要アリ)
    act(() => {
      result.current.increment();
    });
    const incrementResult = result.current.count;
    expect(incrementResult).toBe(4);
  });

  it("正しく引き算が行われるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);

    act(() => {
      result.current.decrement();
    });
    const decrementResult = result.current.count;
    expect(decrementResult).toBe(2);
  });

  it("正しく2倍になるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);

    act(() => {
      result.current.double();
    });
    const doubleResult = result.current.count;
    expect(doubleResult).toBe(6);
  });

  it("正しく3倍になるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);

    act(() => {
      result.current.triple();
    });
    const tripleResult = result.current.count;
    expect(tripleResult).toBe(9);
  });

  it("正しくリセットされるか", async () => {
    //Hooksの利用
    const { result } = renderHook(() => useCounter(3));
    const initialResult = result.current.count;
    expect(initialResult).toBe(3);

    act(() => {
      result.current.reset();
    });
    const tripleResult = result.current.count;
    expect(tripleResult).toBe(0);
  });
});

// { count, increment, decrement, double, triple, reset }
