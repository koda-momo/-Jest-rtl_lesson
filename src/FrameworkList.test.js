import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

//components
import FrameworkList from "./FrameworkList";

//itを使う度にレンダリングをする→再レンダリングの前に一旦前のレンダリング情報を削除
afterEach(() => cleanup());

describe("Frameworkコンポーネントテスト", () => {
  it("Propsがない場合、No dataが表示されること", () => {
    render(<FrameworkList />);

    //Textで取得
    const nodataScreen = screen.getByText("No data");
    expect(nodataScreen).toBeInTheDocument();
  });
  it("Propsがある場合、Propsのデータが表示されること", () => {
    //ダミーデータ
    const dummyData = [
      {
        id: 1,
        item: "React dummy",
      },
      { id: 2, item: "Angular dumm" },
      {
        id: 3,
        item: "Vue dumm",
      },
    ];

    render(<FrameworkList frameworks={dummyData} />);

    //リスト情報の取得(リストは複数なのでgetAllByRole)
    const frameworkScreen = screen.getAllByRole("listitem");

    //表示されているリストのアイテムだけを抽出したもの
    const frameworkItems = frameworkScreen.map((item) => item.textContent);

    //ダミーデータのアイテムだけを抽出したもの
    const dummyItems = dummyData.map((item) => item.item);

    //表示されているリストとダミーのリストが同じか
    expect(frameworkItems).toEqual(dummyItems);

    //Nodataは表示されていない事
    const screenNodata = screen.queryByText("No data");
    expect(screenNodata).toBeNull();
  });
});
