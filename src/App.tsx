/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import dashBoardConfig from "./blogDashboard";
import Blog from "./components/Blog";
import { observer } from "mobx-react-lite";
import store from "./store";
import Login from "./components/Login";
import { checkLogin } from "./utils/requests";
import Toast from "./components/common/Toast";
import Upload from "./components/Upload";
import Data from "./components/Data";
import Tag from "./components/Tag";
import Link from "./components/Link";


function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentTime, setCurrentTime] = useState(getTime());
  function getTime() {
    const time = new Date();
    const hour =
      time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    const minute =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    return `${hour}:${minute}`;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    async function checkIsLogin() {
      try {
        const res = await checkLogin() as checkLoginRes;
        res.data.success ? store.login() : store.logout();
      } catch(err) {
        store.logout();
      }
      
    }
    checkIsLogin();
  },[])
  return (
    <div onClick={() => setShowDashboard(true)} className="relative overflow-hidden bg-transparent flex w-screen h-screen justify-center items-center">
      <div className="fixed p-[1rem] z-[9999] overflow-y-auto right-0 top-0 flex flex-col gap-[1rem] h-screen w-fit">
        {
          store.toastList.map((toastInfo) => <Toast {...toastInfo} />)
        }
      </div>
      <img
        
        className={`z-[-1] bg-black transition-all absolute top-0 left-0 object-cover w-full h-full ${
          showDashboard ? " blur-xl scale-110" : ""
        }`}
        src={dashBoardConfig.background}
        alt=""
      />
      {showDashboard ? (
        store.isLogin ? (
          <div
            onClick={(e) => {e.stopPropagation();setShowDashboard(false)}}
            className={`w-full h-full animate-dashboardIn grid grid-cols-7 max-sm:grid-cols-4 max-md:grid-cols-5 grid-rows-5 justify-items-center items-center`}
          >
            <Blog />
            <Upload />
            <Data />
            {
              dashBoardConfig.tags ?  <Tag /> : null
            }
            {
              dashBoardConfig.links ? <Link /> : null
            }
           
            {dashBoardConfig.apps.map((appInfo) => (
              <div className="flex flex-col gap-[5px] justify-center items-center">
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={appInfo.url}
                  target="_blank"
                >
                  <div className="cursor-pointer flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px] w-[80px] relative h-[80px] rounded-[20px] max-sm:rounded-[15px] bg-white">
                    <img
                      src={appInfo.logo}
                      className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]"
                      alt=""
                    />
                  </div>
                </a>
                <p className="text-sm text-white">{appInfo.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={(e) => {console.log("OK");e.stopPropagation();setShowDashboard(false)}}
            className={`animate-fadeIn w-full h-full flex justify-center items-center`}
          >
            <Login />
          </div>
            
          
        )
      ) : (
        <div className="absolute z-[2] translate-y-[-100px]">
          <p className="text-white text-center text-[48px] font-bold">
            {currentTime}
          </p>
          <p className="text-white text-center text-[24px]">欢迎回来</p>
        </div>
      )}
    </div>
  );
}

export default observer(App);
