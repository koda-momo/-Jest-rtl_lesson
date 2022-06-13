import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

//ユーザのイベントをテストするため
import userEvent from "@testing-library/user-event";

//components
import RenderInput from "./RenderInput";

//itを使う度にレンダリングをする→再レンダリングの前に一旦前のレンダリング情報を削除
afterEach(() => cleanup());

describe("Inputコンポーネントテスト", () => {
  it("表示されているか否か", () => {
    render(<RenderInput />);

    //ボタンが存在しているか否か
    expect(screen.getByRole("button")).toBeTruthy();

    //placeholerで取得
    const screenPlaceholer = screen.getByPlaceholderText("Enter");
    expect(screenPlaceholer).toBeTruthy();
  });
});

describe("inputコンポーネント入力テスト", () => {
  it("正しく入力されるか否か", async () => {
    render(<RenderInput />);
    const screenPlaceholer = screen.getByPlaceholderText("Enter");

    //userEvent.type(入力する場所,"入力する内容")
    await userEvent.type(screenPlaceholer, "test");

    //該当のinputフォームの値が「test」になっているか否か
    expect(screenPlaceholer.value).toBe("test");
  });
});

describe("inputコンポーネントクリックテスト", () => {
  it("inputの値が無いときにクリックされてメソッドが呼ばれるか否か", async () => {
    //ダミーメソッド
    const outputConsole = jest.fn();

    render(<RenderInput outputConsole={outputConsole} />);

    //ボタン情報を取得
    const screenButton = screen.getByRole("button");

    //ボタンをクリック
    await userEvent.click(screenButton);
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it("inputの値がある時にクリックしたら発動するか", async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);

    const inputValue = screen.getByPlaceholderText("Enter");
    await userEvent.type(inputValue, "test");

    const screenButton = screen.getByRole("button");
    await userEvent.click(screenButton);
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
