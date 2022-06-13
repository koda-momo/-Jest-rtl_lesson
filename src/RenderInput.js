import React, { useCallback, useState } from "react";

const RenderInput = ({ outPutConsole }) => {
  const [input, setInput] = useState("");

  /**
   * 入力値をvalueに反映.
   */
  const updateValue = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  /**
   * inputの中身があれば、outPutConsoleを実行
   */
  const outPutValue = useCallback(() => {
    if (input) {
      outPutConsole(input);
    }
  }, [input, outPutConsole]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={(e) => updateValue(e)}
      />
      <button onClick={outPutValue}>Console</button>
    </div>
  );
};

export default RenderInput;
