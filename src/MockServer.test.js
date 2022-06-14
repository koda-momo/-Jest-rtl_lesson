import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

//ユーザのイベントをテストするため
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

//components
import MockServer from "./MockServer";

/**
 * 指定したURLにアクセスすると、実際のURLでなく下記ダミーAPIにアクセスした事にする.
 */
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    //ステータスと返すデータの指定
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

//このテストファイルを発動する前に、1度だけ発動する(今回は疑似サーバを立てる)
beforeAll(() => server.listen());

//itを使う度に発動:サーバの立ち上げ直しとレンダリングデータの削除
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

//このテストファイルが終わった後に発動:サーバを閉じる
afterAll(() => {
  server.close();
});

describe("MockServerコンポーネントテスト", () => {
  it("APIを叩いて問題なく表示されること", async () => {
    render(<MockServer />);

    //ボタンのクリック
    const buttonScreen = screen.getByRole("button");
    //   userEvent.click(buttonScreen);
    act(() => {
      buttonScreen.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    //ユーザ情報が表示されているか否か
    const userNameScreen = await screen.findByRole("heading");
    expect(userNameScreen).toHaveTextContent("Bred dummy");

    //ボタンの属性(disabled)が存在するか否か
    expect(buttonScreen).toHaveAttribute("disabled");
    expect(buttonScreen).toHaveTextContent("Loaded");
  });

  it("APIが失敗した場合の処理", async () => {
    //it内でのみ適用される疑似API
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          //ステータスと返すデータの指定
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);

    //ボタンのクリック
    const buttonScreen = screen.getByRole("button");
    act(() => {
      buttonScreen.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    //ユーザ情報が表示されているか否か
    const errorScreen = await screen.findByTestId("error");
    expect(errorScreen).toHaveTextContent("データの取得に失敗しました。");

    //ユーザ情報が表示されているか否か
    const userNameScreen = screen.queryByRole("heading");
    expect(userNameScreen).toBeNull();

    //ボタンの属性(disabled)が存在するか否か
    expect(buttonScreen).toHaveAttribute("disabled");
  });
});
