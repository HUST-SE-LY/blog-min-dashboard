/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import friendLinkSVG from "../assets/friendLink.svg";
import { useEffect, useState } from "react";
import Header from "./common/Header";
import { deleteSingleFriendLink, getFriendLinkList, getUnreadFriendLink, passSingleFriendLink } from "../utils/requests";
import store from "../store";

function FriendLink() {
  const [showAnimate, setShowAnimate] = useState(false);
  const [showApp, setShowApp] = useState(false);
  function initApp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setShowAnimate(true);
    setTimeout(() => {
      setShowApp(true);
    }, 500);
  }
  return (
    <>
      <div className="relative flex gap-[5px] flex-col justify-center items-center">
        <div
          onClick={(e) => {
            initApp(e);
          }}
          className="cursor-pointer flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px] max-sm:rounded-[15px] w-[80px] relative h-[80px] rounded-[20px] bg-white"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={` transition-all duration-500 bg-transparent w-[1px] h-[1px] absolute top-[40px] left-[40px] ${
              showAnimate ? "bg-white scale-x-[4000] scale-y-[2000]" : "scale-0"
            } ${showApp ? "" : "z-[9999]"}`}
          ></div>
          <img
            src={friendLinkSVG}
            className={`max-sm:w-[30px] max-sm:h-[30px] transition-all delay-[250ms] ${
              showAnimate
                ? "opacity-0 scale-[2] rotate-45"
                : "opacity-[1] scale-[1]"
            }`}
            alt=""
          />
        </div>
        <p className="text-white text-sm">友链</p>
      </div>
      {showApp ? (
        <FriendLinkDetail
          onSetShowAnimate={setShowAnimate}
          onSetShowApp={setShowApp}
        />
      ) : null}
    </>
  );
}

function FriendLinkDetail(props: commonAppProps) {
  const [friendLinkList, setFriendLinkList] = useState<friendLinkInfo[]>([]);
  useEffect(() => {
    async function init() {
      try {
        const res = (await getUnreadFriendLink()) as getFriendLinkListRes;
        setFriendLinkList(res.data.list);
      } catch (err) {
        store.addToast("初始化数据失败");
      }
    }
    init();
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0  w-full h-full bg-white z-[100]"
    >
      <Header title="管理友链" {...props} />
      <div className="h-[calc(100vh_-_50px)] w-full gap-[1rem] p-[1rem] overflow-y-auto">
        <div className="flex flex-col gap-[1rem]">
          {friendLinkList.map((info) => (
           <SingleFriendLink setList={setFriendLinkList}  {...info} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SingleFriendLink(props: friendLinkInfo&{setList: (FriendLinkList: friendLinkInfo[]) => void}) {
  async function freshList() {
    try {
      const res = (await getFriendLinkList()) as getFriendLinkListRes;
      props.setList(res.data.list);
    } catch (err) {
      store.addToast("刷新数据失败");
    }
  }
  async function deleteFriendLink() {
    try {
      await deleteSingleFriendLink({id: props.id});
      await freshList();
      store.addToast("删除成功");
    } catch (err) {
      store.addToast("删除失败");
    }
  }
  async function passFriendLink() {
    try {
      await passSingleFriendLink({id: props.id});
      await freshList();
      store.addToast("通过成功");
    } catch (err) {
      store.addToast("通过失败");
    }
  }
  return (
    <div className="flex gap-[1rem] max-sm:text-sm group overflow-x-auto non-scrollbar">
      <div className="w-[5rem] group-hover:text-blue-300 max-sm:text-sm transition-all flex-shrink-0">{props.name}</div>
      <div className="w-[10rem] group-hover:text-blue-300 max-sm:text-sm transition-all flex-shrink-0">{props.content}</div>
      <a className="w-[15rem] group-hover:text-blue-300 max-sm:text-sm flex-shrink-0 transition-all " href={props.url} target="_blank">{props.url}</a>
      <div className="ml-[auto] flex gap-[1rem]">
      {props.isPass === 1 ? null : <button onClick={passFriendLink} className="bg-blue-400 max-sm:text-sm transition-all flex-shrink-0 whitespace-nowrap hover:bg-blue-500 rounded-full text-white w-fit px-[1rem] py-[0.2rem]">通过</button>}
        <button onClick={deleteFriendLink} className="bg-red-400 flex-shrink-0 text-white max-sm:text-sm rounded-full transition-all whitespace-nowrap hover:bg-red-500  w-fit px-[1rem] py-[0.2rem]">删除</button>
      </div>
    </div>
  );
}

export default observer(FriendLink);
