interface dashBoardConfig {
  avatar: string;
  username: string;
  host: string;
  imagePath: string;
  comment: boolean;
  friendLink: boolean;
  graph: boolean;
  tags: boolean;
  links: boolean;
  background: string;
  router: router;
  apps: appInfo[];
}

const dashBoardConfig: dashBoardConfig = {
  avatar: "avatar.jpg",
  username: "柴犬",
  host: "https://www.coisini.love/api/",
  imagePath: "https://www.coisini.love/api/picture/",
  comment: true,
  friendLink: true,
  graph: true,
  tags: true,
  links: true,
  background: "background.jpeg",
  router: {
    getBlogList: {
      path: "/get/blog",
      method: "post",
    },
    getBlogByTitle: {
      path: "/get/blogByTitle",
      method: "post",
    },
    getBlogTags: {
      path: "/get/blogTag",
      method: "post",
    },
    getTags: {
      path: "/get/tag",
      method: "post",
    },
    getLinks: {
      path: "/get/link",
      method: "post",
    },
    getBlogComments: {
      path: "/get/comment",
      method: "post",
    },
    login: {
      path: "/login",
      method: "post",
    },
    checkLogin: {
      path: "/check",
      method: "post",
    },
    updateBlogInfo: {
      path: "/update/blog",
      method: "post",
    },
    uploadSingleBlog: {
      path: "/upload/blog",
      method: "post",
    },
    deleteSingleBlog: {
      path: "/delete/blog",
      method: "post",
    },
    deleteSingleTag: {
      path: "/delete/tag",
      method: "post",
    },
    addSingleTag: {
      path: "/set/tag",
      method: "post",
    },
    addSingleLink: {
      path: "/set/link",
      method: "post",
    },
    deleteSingleLink: {
      path: "/delete/link",
      method: "post",
    },
    getAllDates: {
      path: "/get/allDate",
      method: "post",
    },
    deleteSingleComment: {
      path: "/delete/comment",
      method: "post",
    }
  },
  apps: [
    {
      name: "telegram",
      url: "https://web.telegram.org/",
      logo: "telegram.svg",
    },
    {
      name: "twitter",
      url: "https://twitter.com/",
      logo: "twitter.svg",
    },
    {
      name: "github",
      url: "https://github.com/",
      logo: "github-icon.svg",
    },
    {
      name: "bilibili",
      url: "https://www.bilibili.com/",
      logo: "bilibili.svg",
    },
    {
      name: "apple",
      url: "https://www.apple.com.cn/cn-edu/store",
      logo: "apple.svg"
    },
    {
      name: "google",
      url: "https://www.google.com/",
      logo: "google.svg"
    },
    {
      name: "gmail",
      url: "https://mail.google.com/",
      logo: "gmail.svg"
    },
    {
      name: "react",
      url: "https://react.dev/",
      logo: "react.svg"
    },
    {
      name: "vue",
      url: "https://vuejs.org/",
      logo: "vue.svg"
    }

  ],
};

export default dashBoardConfig;
