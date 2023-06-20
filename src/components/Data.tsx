/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import dataSVG from "../assets/data.svg";
import { observer } from "mobx-react-lite";
import Header from "./common/Header";
function Data() {
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
          className="cursor-pointer flex justify-center items-center w-[80px] relative h-[80px] rounded-[20px] bg-white"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={` transition-all duration-500 bg-transparent w-[1px] h-[1px] absolute top-[40px] left-[40px] ${
              showAnimate ? "bg-white scale-x-[3000] scale-y-[1500]" : "scale-0"
            } ${showApp ? "" : "z-[9999]"}`}
          ></div>
          <img src={dataSVG} alt="" />
        </div>
        <p className="text-white text-sm">数据</p>
      </div>
      {showApp ? <DataDetail onSetShowAnimate={setShowAnimate} onSetShowApp={setShowApp} /> : null}
    </>
  );
}

function DataDetail(props: commonAppProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed top-0 left-0 w-full h-full bg-white z-[100]"
    >
      <Header title="博客数据" {...props} />
    </div>
  );
}

export default observer(Data);
