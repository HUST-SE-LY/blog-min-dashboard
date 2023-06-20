/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import tagSVG from "../assets/tag.svg";
import { useEffect, useState } from "react";
import Header from "./common/Header";
import deleteTagSVG from "../assets/deleteTag.svg";
import { addSingleTag, deleteSingleTag, getTags } from "../utils/requests";
import store from "../store";

function Tag() {
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
            src={tagSVG}
            className={`transition-all delay-[250ms] max-sm:w-[30px] max-sm:h-[30px] ${
              showAnimate ? "opacity-0 scale-[2] rotate-45" : "opacity-[1] scale-[1]"
            }`}
            alt=""
          />
        </div>
        <p className="text-white text-sm">tag</p>
      </div>
      {showApp ? (
        <TagDetail
          onSetShowAnimate={setShowAnimate}
          onSetShowApp={setShowApp}
        />
      ) : null}
    </>
  );
}

function TagDetail(props: commonAppProps) {
  const [tags, setTags] = useState<tagInfo[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  async function deleteTag(id: number) {
    try {
      await deleteSingleTag({id: id});
      await freshTagList();
      setCurrentTag("");
      store.addToast("删除tag成功");
    } catch (err) {
      store.addToast("删除tag失败");
    }
  }
  async function addTag(e: React.KeyboardEvent) {
    if (e.code === "Enter") {
      try {
        await addSingleTag({ name: currentTag });
        await freshTagList();
        setCurrentTag("");
        store.addToast("添加tag成功");
      } catch (err) {
        store.addToast("添加tag失败");
      }
    }
  }

  async function freshTagList() {
    try {
      const res = (await getTags()) as getTagsRes;
      setTags(res.data.tags);
    } catch (err) {
      store.addToast("获取tag失败");
    }
  }
  useEffect(() => {
    async function initTags() {
      try {
        const res = (await getTags()) as getTagsRes;
        setTags(res.data.tags);
      } catch (err) {
        store.addToast("获取tag失败");
      }
    }
    initTags();
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0 w-full h-full bg-white z-[100]"
    >
      <Header title="管理Tag" {...props} />
      <div className="h-[calc(100vh_-_50px)] w-full overflow-y-auto p-[1rem]">
        <div className="relative overflow-x-auto w-full flex items-center gap-[0.5rem] px-[1rem] py-[0.5rem] border-[1px] border-gray-200 rounded-xl">
          <div className="flex flex-wrap gap-[0.5rem]">
            {tags.map((tagInfo) => (
              <div
                key={tagInfo.name}
                className="flex flex-shrink-0 items-center text-sm gap-[0.5rem] py-[2px] pl-[1rem] rounded-full border-[1px] border-blue-200"
              >
                <div className="">{tagInfo.name}</div>
                <img
                  onClick={() => deleteTag(tagInfo.id)}
                  src={deleteTagSVG}
                  className="cursor-pointer w-[24px] h-[24px] ml-auto"
                  alt=""
                />
              </div>
            ))}
          </div>
          <input
            placeholder="回车添加标签"
            value={currentTag}
            onKeyUp={(e) => addTag(e)}
            className="outline-none text-sm"
            onChange={(e) => setCurrentTag(e.target.value)}
          />
          <div className="ml-auto text-sm text-gray-300">修改常用标签</div>
        </div>
      </div>
    </div>
  );
}

export default observer(Tag);
