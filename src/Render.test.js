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
    expect(headingScreen).toBeTruthy(); //存在していたらtrue

    //textbox
    const inputScreen = screen.getByRole("textbox");
    expect(inputScreen).toBeTruthy();

    //button
    const buttonScreen = screen.getAllByRole("button"); //要素が複数ある場合は「getAllByRole」
    expect(buttonScreen[0]).toBeTruthy(); //複数取得→配列になっているので何個目のボタンを見るか指定
    expect(buttonScreen[1]).toBeTruthy();

    //p
    const pScreen = screen.getByText("Udemy"); //getByRoleでもOK
    expect(pScreen).toBeTruthy();

    //p 無い事を証明する
    const pNonScreen = screen.queryByText("Udeeeemy");
    expect(pNonScreen).toBeNull();

    //span idで取得
    const spanScreen = screen.getByTestId("copyright");
    expect(spanScreen).toBeTruthy();
  });
});
