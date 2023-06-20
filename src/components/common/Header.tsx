export default function Header(props: commonHeaderProps) {
  function closeApp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    props.onSetShowApp(false);
    props.onSetShowAnimate(false);
  }
  return (
    <div className="grid animate-fadeIn grid-cols-2 items-center h-[50px] px-[1rem] w-full border-b-2 border-blue-200">
      <p>{props.title}</p>
      <div className="ml-[auto]">
        <button
          onClick={(e) => closeApp(e)}
          className="bg-purple-400 transition-all hover:bg-purple-500 rounded-full text-white w-fit h-fit p-[0.2rem_2rem]"
        >
          关闭
        </button>
      </div>
    </div>
  );
}