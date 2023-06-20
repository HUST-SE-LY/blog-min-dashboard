declare interface commonAppProps {
  onSetShowApp: (showApp: boolean) => void;
  onSetShowAnimate: (showAnimate: boolean) => void;
}

declare interface commonHeaderProps extends commonAppProps {
  title: string;
}


declare interface singleBlogProps extends blogInfo {
  setShowSingleBlogInfo: (showSingleBlogInfo: boolean) => void;
  setCurrentBlog: (currentBlog: blogInfo) => void;
}

declare interface singleBlogInfoProps extends blogInfo {
  setShowSingleBlogInfo: (showSingleBlogInfo: boolean) => void;
}

