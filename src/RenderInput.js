import React, { useCallback, useState } from "react";

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = useState("");

  /**
   * クリックしたら発動.
   * @remarks inputの値が無ければ発動しない
   */
  const outputValue = useCallback(() => {
    if (input) {
      outputConsole(input);
    }
  }, [input, outputConsole]);

  /**
   * 入力値反映メソッド.
   */
  const updateValue = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={updateValue}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
