import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

//components
import UseEffectRender from "./UseEffectRender";

//itを使う度にレンダリングをする→再レンダリングの前に一旦前のレンダリング情報を削除
afterEach(() => cleanup());

describe("UseEffectコンポーネントテスト", () => {
  it("データが入っていない場合、表示されないこと", () => {
    render(<UseEffectRender />);

    //Iamを取得(/で囲むと部分一致検索) → nullならOK
    const errorScreen = screen.queryByText(/I am/);
    expect(errorScreen).toBeNull();
  });
  it("データが入っているか否か", async () => {
    render(<UseEffectRender />);

    //Iamを取得(/で囲むと部分一致検索) → 取得出来ればOK
    const userDataScreen = await screen.findByText(/I am/);
    expect(userDataScreen).toBeInTheDocument();
  });
});
