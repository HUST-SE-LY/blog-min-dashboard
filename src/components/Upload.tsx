/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import uploadSVG from "../assets/upload.svg";
import Header from "./common/Header";
import store from "../store";
import deleteTagSVG from "../assets/deleteTag.svg";
import {uploadSingleBlog} from "../utils/requests";

function Upload() {
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
          <img src={uploadSVG} className={`transition-all max-sm:w-[30px] max-sm:h-[30px] delay-[250ms] ${showAnimate ? "rotate-45 opacity-0 scale-[2]" : "opacity-[1] scale-[1]"}`} alt="" />
        </div>
        <p className="text-white text-sm">上传</p>
      </div>
      {showApp ? (
        <UploadDetail
          onSetShowApp={setShowApp}
          onSetShowAnimate={setShowAnimate}
        />
      ) : null}
    </>
  );
}

function UploadDetail(props: commonAppProps) {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [picture, setPicture] = useState<File>();
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<tagInfo[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const pictureInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  function deleteTag(tag: string) {
    const res = tags.filter((info) => info.name !== tag);
    setTags(res);
  }
  function addTag(e: React.KeyboardEvent) {
    if (e.code === "Enter") {
      const res = [...tags, { name: currentTag, id: 1 }];
      setTags(res);
      setCurrentTag("");
    }
  }

  function choosePicture() {
    pictureInput.current && pictureInput.current.click();
  }

  function chooseFile() {
    fileInput.current && fileInput.current.click();
  }
  async function uploadBlog() {
    if(!(title && des && picture && tags && file)) {
      store.addToast("失败：请填写所有应填项");
      return ;
    }
    const tagList:string[] = [];
    tags.forEach(info => tagList.push(info.name));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("tags", tagList.join(","))
    picture&&formData.append("picture", picture);
    file&&formData.append("blog", file);
    try {
      const res = await uploadSingleBlog(formData);
      if (res.status === 200) {
        store.addToast("上传成功");
        props.onSetShowApp(false);
        props.onSetShowAnimate(false);
      }
    } catch(err) {
      store.addToast("上传失败")
    }
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0 w-full h-full bg-white z-[100]"
    >
      <Header title="上传博客" {...props} />
      <div className="h-[calc(100vh_-_50px)] w-full overflow-y-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className=" flex flex-col gap-[1rem] p-[1rem] animate-fadeIn"
      >
        <p className="text-center font-bold text-lg">上传博客</p>
        <div className="relative">
          <input
            placeholder="填写标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
            type="text"
          />
          <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
            填写标题
          </div>
        </div>
        <div className="relative">
          <input
            placeholder="填写简介"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
            type="text"
          />
          <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
            填写简介
          </div>
        </div>
        <div className="relative flex items-center gap-[0.5rem] px-[1rem] py-[0.5rem] border-[1px] border-gray-200 rounded-xl">
          <div className="flex gap-[0.5rem]">
            {tags.map((tagInfo) => (
              <div
                key={tagInfo.name}
                className="flex items-center text-sm gap-[0.5rem] py-[2px] pl-[1rem] rounded-full border-[1px] border-blue-200"
              >
                <div className="">{tagInfo.name}</div>
                <img
                  onClick={() => deleteTag(tagInfo.name)}
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
          <div className="ml-auto text-sm text-gray-300">添加标签</div>
        </div>
        <div className="w-full relative border-[1px] rounded-2xl px-[1rem] py-[0.5rem] border-gray-200 flex items-center">
          <div className="relative flex items-center gap-[1rem]">
            <button
              onClick={() => choosePicture()}
              className=" text-sm py-[0.5rem] px-[1rem] bg-blue-500 rounded-full text-white"
            >
              点击选择封面
            </button>
            <input
              ref={pictureInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && setPicture(e.target.files[0])}
            />
            <p>
              {pictureInput.current &&
                pictureInput.current.value.split("\\").pop()}
            </p>
          </div>
          <div className="ml-auto text-sm text-gray-300">选择封面</div>
        </div>
        <div className="w-full relative border-[1px] rounded-2xl px-[1rem] py-[0.5rem] border-gray-200 flex items-center">
          <div className="relative flex items-center gap-[1rem]">
          <button
            onClick={() => chooseFile()}
            className="text-sm py-[0.5rem] px-[1rem] bg-blue-500 rounded-full text-white"
          >
            点击选择博客
          </button>
          <input
            ref={fileInput}
            type="file"
            accept=".md"
            className="hidden"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <p>
            {fileInput.current && fileInput.current.value.split("\\").pop()}
          </p>
        </div>
        <div className="ml-auto text-sm text-gray-300">选择博客文件</div>
        </div>
        <div onClick={() => uploadBlog()} className="relative min-h-[2rem] w-full text-center cursor-pointer border-[1px] border-blue-300 transition-all hover:text-white hover:bg-blue-500 text-sm leading-[2rem] px-[1rem] overflow-hidden rounded-2xl ">
          上传
        </div>
      </div>
      </div>
    </div>
  );
}

export default observer(Upload);
