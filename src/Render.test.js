import React from "react";
import { render, screen } from "@testing-library/react";

//components
import Render from "./Render";

describe("Renderコンポーネントテスト", () => {
  it("表示されるかどうか", () => {
    render(<Render />);
    // screen.debug();

    //ヘッダーに関する要素を取得
    // screen.debug(screen.getByRole("heading"));
    const headingScreen = screen.getByRole("heading");
    expect(headingScreen).toBeTruthy();
    // "React Testing Library Lesson"
  });
});
