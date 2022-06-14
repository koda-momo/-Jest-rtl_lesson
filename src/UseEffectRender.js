import { useEffect, useState } from "react";
import axios from "axios";

const UseEffectRender = () => {
  const [user, setUser] = useState(null);

  const fetchJSON = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    return res.data;
  };

  /**
   * 最初にレンダリングされた時にユーザデータを取得する.
   */
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchJSON();
      setUser(data);
    };
    fetchUser();
  }, []);

  return <div>{user ? <p>I am {user.name}</p> : null}</div>;
};

export default UseEffectRender;
