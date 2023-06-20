/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import store from "../store";
import { useState } from "react";
import { login } from "../utils/requests";
import dashBoardConfig from "../blogDashboard";

function Login() {
  const [passwordTrue, setPasswordTrue] = useState(true);
  const [password, setPassword] = useState("");

  async function signIn(e:React.KeyboardEvent<HTMLInputElement>) {
    if(e.code === "Enter") {
      const res = await login({password: password}) as loginRes;
      if(res.data.success) {
        store.login();
        localStorage.setItem('token', res.data.token);
      } else {
        setShakeAni();
      }
      
    }
  }

  function setShakeAni() {
    setPassword("")
    setPasswordTrue(false);
    setTimeout(() => {
      setPasswordTrue(true)
    },500)
  }

  return <div className="flex flex-col translate-y-[-100px] justify-center items-center gap-[10px]" onClick={e => e.stopPropagation()}>
    <img src={dashBoardConfig.avatar} className="w-[80x] h-[80px] object-cover rounded-full" alt="" />
    <p className="text-white">{dashBoardConfig.username}</p>
    <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => signIn(e)} type="password" placeholder="输入密码" className={ `${passwordTrue ? "" : "animate-shake"} placeholder:text-[16px] placeholder:text-white/50 placeholder:leading-[40px]  h-[40px] bg-white/50 text-white/70 outline-none rounded-xl px-[1em]`} />
  </div>
}

export default observer(Login)