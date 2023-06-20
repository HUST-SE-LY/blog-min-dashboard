/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import linkSVG from "../assets/link.svg";
import { useEffect, useState } from "react";
import Header from "./common/Header";
import { addSingleLink, deleteSingleLink, getLinks } from "../utils/requests";
import store from "../store";

function Link() {
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
              showAnimate ? "bg-white scale-x-[3000] scale-y-[1500]" : "scale-0"
            } ${showApp ? "" : "z-[9999]"}`}
          ></div>
          <img
            src={linkSVG}
            className={`transition-all max-sm:w-[30px] max-sm:h-[30px] delay-[250ms] ${
              showAnimate
                ? "opacity-0 scale-[2] rotate-45"
                : "opacity-[1] scale-[1]"
            }`}
            alt=""
          />
        </div>
        <p className="text-white text-sm">链接</p>
      </div>
      {showApp ? (
        <LinkDetail
          onSetShowApp={setShowApp}
          onSetShowAnimate={setShowAnimate}
        />
      ) : null}
    </>
  );
}

function LinkDetail(props: commonAppProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [linkList, setLinkList] = useState<linkInfo[]>([]);
  async function addLink() {
    try {
      await addSingleLink({
        name: name,
        url: url,
      });
      await freshLinkList();
      store.addToast("添加常用链接成功");
      setName("");
      setUrl("");
    } catch (err) {
      store.addToast("添加常用链接失败");
    }
  }
  async function freshLinkList() {
    try {
      const res = (await getLinks()) as getLinksRes;
      setLinkList(res.data.links);
    } catch (err) {
      store.addToast("获取链接失败");
    }
  }
  async function deleteLink(id: number) {
    try {
      await deleteSingleLink({id});
      await freshLinkList();
      store.addToast("删除链接成功！")
    } catch(err) {
      store.addToast("删除链接失败");
    }
  }
  useEffect(() => {
    async function init() {
      try {
        const res = (await getLinks()) as getLinksRes;
        setLinkList(res.data.links);
      } catch (err) {
        store.addToast("获取链接失败");
      }
    }
    init();
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0 w-full h-full bg-white z-[100]"
    >
      <Header title="常用链接" {...props} />
      <div className="h-[calc(100vh_-_50px)] w-full overflow-y-auto p-[1rem]">
        <div className="flex flex-col gap-[1rem]">
          {linkList.map((linkInfo) => (
            <div className="flex gap-[1rem] group items-center ">
              <div className="w-[100px] px-[1rem] py-[0.2rem] rounded group-hover:bg-blue-200 flex-shrink-0">{linkInfo.name}</div>
              <a href={linkInfo.url} className="hover:text-blue-500 px-[1rem] py-[0.2rem] rounded group-hover:bg-blue-200 transition-all">{linkInfo.url}</a>
              <button onClick={() => deleteLink(linkInfo.id)} className=" ml-auto w-fit py-[0.2rem] px-[2rem] rounded-xl bg-blue-500 transition-all hover:bg-blue-600 text-white">删除</button>
            </div>
          ))}
          <div className="relative">
            <input
              placeholder="填写网站名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
              type="text"
            />
            <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
              填写网站名称
            </div>
          </div>
          <div className="relative">
            <input
              placeholder="填写网站url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
              type="text"
            />
            <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
              填写网站url
            </div>
          </div>
          <div
            onClick={() => addLink()}
            className="relative min-h-[2rem] w-full text-center cursor-pointer border-[1px] border-blue-300 transition-all hover:text-white hover:bg-blue-500 text-sm leading-[2rem] px-[1rem] overflow-hidden rounded-2xl "
          >
            上传
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Link);
