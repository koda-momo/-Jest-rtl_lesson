import { useState } from "react";
import axios from "axios";

function MockServer() {
  //ボタンを押せる押せないの状態管理
  const [clicked, setClicked] = useState(false);

  //取得情報ユーザの名前
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  /**
   * ボタンをクリックしたらユーザ情報を取得.
   */
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const name = res.data.username;
      setUsername(name);

      //処理が成功したらtrueに切替
      setClicked(true);
    } catch (e) {
      setError("データの取得に失敗しました。");
    }
  };

  //ボタンの表記
  const buttonText = clicked ? "Loaded" : "Start";

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>

      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
}

export default MockServer;
