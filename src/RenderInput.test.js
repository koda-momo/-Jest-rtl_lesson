import React from "react";
import { render, screen } from "@testing-library/react";

import { RenderInput } from "./RenderInput";

describe("Inputコンポーネントテスト", () => {
  it("表示されるかどうか", () => {
    render(<RenderInput />);
  });
});
