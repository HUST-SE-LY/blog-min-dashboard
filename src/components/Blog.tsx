/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import blogSVG from "../assets/blog.svg";
import Header from "./common/Header";
import {
  deleteSingleBlog,
  deleteSingleComment,
  getBlogComments,
  getBlogList,
  getBlogTags,
  updateBlogInfo,
} from "../utils/requests";
import dashBoardConfig from "../blogDashboard";
import { observer } from "mobx-react-lite";
import deleteTagSVG from "../assets/deleteTag.svg";
import store from "../store";

function Blog() {
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
            src={blogSVG}
            className={`max-sm:w-[30px] max-sm:h-[30px] transition-all delay-[250ms] ${
              showAnimate
                ? "opacity-0 scale-[2] rotate-45"
                : "opacity-[1] scale-[1]"
            }`}
            alt=""
          />
        </div>
        <p className="text-white text-sm">博客</p>
      </div>
      {showApp ? (
        <BlogDetail
          onSetShowApp={setShowApp}
          onSetShowAnimate={setShowAnimate}
        />
      ) : null}
    </>
  );
}

function BlogDetail(props: commonAppProps) {
  const [blogList, SetBlogList] = useState<blogInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [showSingleBlogInfo, setShowSingleBlogInfo] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<blogInfo>();
  const bottom = useRef<HTMLDivElement>(null);
  const limit = 18;
  let offset = 0;
  const initList: number[] = [];

  for (let i = 0; i < 18; i++) {
    initList.push(i);
  }
  const updateBlogList = async () => {
    if (loading) return;
    setLoading(true);
    const res = (await getBlogList({
      limit: limit,
      offset: offset,
    })) as getBlogRes;
    if (res.data.blogs.length < limit) {
      setIsBottom(true);
    }
    for (let i = 0; i < res.data.blogs.length; i++) {
      setTimeout(() => {
        SetBlogList((prev) => [...prev, res.data.blogs[i]]);
        offset++;
      }, 100 * i);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (bottom.current) {
      const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].intersectionRatio > 0) {
          await updateBlogList();
        }
      });
      observer.observe(bottom.current);
    }
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0 w-full h-full bg-white z-[100]"
    >
      <Header {...props} title="博客管理" />
      <div className="h-[calc(100vh_-_50px)] w-full overflow-y-auto">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 max-md:grid-cols-3 gap-[10px] items-center justify-items-center">
          {blogList.map((blogInfo) => (
            <SingleBlog
              setCurrentBlog={setCurrentBlog}
              setShowSingleBlogInfo={setShowSingleBlogInfo}
              {...blogInfo}
              key={blogInfo.id}
            />
          ))}
        </div>

        {isBottom ? null : (
          <div
            ref={bottom}
            className="w-full h-full grid max-sm:grid-cols-2 max-md:grid-cols-3 grid-cols-4 gap-[10px] items-center justify-items-center"
          >
            {initList.map((index) => (
              <div
                key={index}
                className="flex h-[180px] justify-center items-center flex-col gap-[10px]"
              >
                <div className="w-[180px] h-[100px] bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-[160px] h-[20px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showSingleBlogInfo ? (
        <SingleBlogInfo
          {...(currentBlog as blogInfo)}
          setShowSingleBlogInfo={setShowSingleBlogInfo}
        />
      ) : null}
    </div>
  );
}

function SingleBlog(props: singleBlogProps) {
  return (
    <div className="animate-blogIn flex h-[180px] justify-center items-center flex-col gap-[10px]">
      <div
        onClick={() => {
          props.setCurrentBlog({
            date: props.date,
            title: props.title,
            des: props.des,
            picture: props.picture,
            file: props.file,
            id: props.id,
          });
          props.setShowSingleBlogInfo(true);
        }}
        className="cursor-pointer relative w-[180px] h-[100px] rounded-lg border-[1px] border-gray-200"
      >
        <img
          className="rounded-lg absolute z-[-1] top-0 left-0 w-full h-full object-cover"
          src={dashBoardConfig.imagePath + props.picture}
          alt=""
        />
      </div>
      <div className="text-sm h-[18px] rounded ">{props.title}</div>
    </div>
  );
}

function SingleBlogInfo(props: singleBlogInfoProps) {
  const [title, setTitle] = useState(props.title);
  const [des, setDes] = useState(props.des);
  const [picture, setPicture] = useState<File>();
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<tagInfo[]>([]);
  const [commentList, setCommentList] = useState<commentInfo[]>([]);
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

  async function updateInfo() {
    const tagList: string[] = [];
    tags.forEach((info) => tagList.push(info.name));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("id", props.id.toString());
    formData.append("tags", tagList.join(","));
    picture && formData.append("picture", picture);
    file && formData.append("blog", file);
    try {
      const res = await updateBlogInfo(formData);
      if (res.status === 200) {
        store.addToast("修改博客信息成功");
        props.setShowSingleBlogInfo(false);
      }
    } catch (err) {
      store.addToast("修改博客信息失败");
    }
  }

  async function deleteBlog() {
    try {
      const res = await deleteSingleBlog({
        id: props.id,
      });
      if (res.status === 200) {
        store.addToast("删除博客成功");
        props.setShowSingleBlogInfo(false);
      }
    } catch (err) {
      store.addToast("删除博客失败");
    }
  }

  async function deleteComment(id: number) {
    try {
      await deleteSingleComment({id: id});
      await freshComments();
      store.addToast("删除评论成功");
    } catch(err) {
      store.addToast("删除评论失败");
    }
  }

  async function freshComments() {
    const res = (await getBlogComments({
      offset: 0,
      limit: 9999,
      blog: props.id,
    })) as getCommentsRes;
    setCommentList(res.data.list);
  }

  useEffect(() => {
    async function getTags() {
      const res = (await getBlogTags({ id: props.id })) as getBlogTagRes;
      setTags(res.data.tags);
    }
    async function getComments() {
      const res = (await getBlogComments({
        offset: 0,
        limit: 9999,
        blog: props.id,
      })) as getCommentsRes;
      setCommentList(res.data.list);
    }
    getTags();
    getComments();
  }, []);
  return (
    <div
      onClick={() => props.setShowSingleBlogInfo(false)}
      className=" animate-fadeIn fixed flex justify-center items-center w-screen h-screen bg-white/50 z-[5] top-0 left-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-x-auto flex flex-col gap-[1rem] p-[1rem] border-[1px] border-gary-200 rounded-xl shadow-lg w-[80%] h-[80%]"
      >
        <p className="text-center font-bold text-lg">修改博客内容</p>
        <div className="relative">
          <input
            placeholder="修改标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
            type="text"
          />
          <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
            修改标题
          </div>
        </div>
        <div className="relative">
          <input
            placeholder="修改简介"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="outline-none w-full px-[1rem] py-[0.5rem] text-sm rounded-lg border-[1px] border-gray-200 focus:border-blue-400 transition-all "
            type="text"
          />
          <div className="absolute right-0 w-fit top-0 px-[1rem] py-[0.5rem] text-sm text-gray-300">
            修改简介
          </div>
        </div>
        <div className="relative flex overflow-x-auto min-h-[3rem] flex-wrap items-center gap-[1.5rem] px-[1rem] py-[0.5rem] border-[1px] border-gray-200 rounded-xl">
          <div className="flex gap-[0.5rem]">
            {tags.map((tagInfo) => (
              <div
                key={tagInfo.name}
                className="flex flex-shrink-0 items-center text-sm gap-[0.5rem] py-[2px] pl-[1rem] rounded-full border-[1px] border-blue-200"
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
            className="outline-none text-sm flex-shrink-0"
            onChange={(e) => setCurrentTag(e.target.value)}
          />
          <div className="ml-auto flex-shrink-0 text-sm text-gray-300">
            修改标签
          </div>
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
          <div className="ml-auto text-sm text-gray-300">修改封面</div>
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
          <div className="ml-auto text-sm text-gray-300">修改博客文件</div>
        </div>
        {commentList.map((info) => (
          <div key={info.id} className="flex group items-center">
            <div>
              <div className="text-[12px] w-fit p-[0.1rem_0.5rem] mb-[4px] rounded-[10px_10px_10px_0] bg-blue-200">
                {info.name}
              </div>
              <div className="text-sm w-fit p-[0.5rem_1rem] group-hover:bg-blue-400 transition-all bg-blue-500 rounded-[0px_20px_20px_20px] text-white">
                {info.content}
              </div>
            </div>
            <button onClick={() => deleteComment(info.id)} className="ml-[auto] w-fit text-sm p-[0.2rem_1rem] bg-blue-500 hover:bg-blue-600 text-white rounded-full">删除</button>
          </div>
        ))}

        <div
          onClick={() => updateInfo()}
          className="relative min-h-[2rem] w-full text-center cursor-pointer border-[1px] border-blue-300 transition-all hover:text-white hover:bg-blue-500 text-sm leading-[2rem] px-[1rem] overflow-hidden rounded-2xl "
        >
          提交修改信息
        </div>
        <div
          onClick={() => deleteBlog()}
          className="relative min-h-[2rem] w-full text-center cursor-pointer border-[1px] border-red-300 transition-all hover:text-white hover:bg-red-500 text-sm leading-[2rem] px-[1rem] overflow-hidden rounded-2xl "
        >
          删除博客
        </div>
      </div>
    </div>
  );
}

export default observer(Blog);
