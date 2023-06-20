/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import deleteSVG from "../../assets/deleteToast.svg"
import store from "../../store";

function Toast(props: toastInfo) {
  return <div className="border-gray-200 max-sm:mx-[auto] border-[1px] animate-fadeIn shadow-xl relative w-[300px]  p-[0.5rem] rounded-lg bg-white/50 backdrop-blur-md h-fit">
    <p className="text-gray-500">{props.content}</p>
    <p className="text-sm mt-[0.5rem] text-gray-500">{props.time}</p>
    <img onClick={() => store.deleteToast(props.id)} src={deleteSVG} className="absolute cursor-pointer right-[10px] top-[10px] w-[20px] h-[20px]" alt="" />
  </div>
}

export default observer(Toast)