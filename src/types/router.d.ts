declare interface routerType {
  method: "get" | "post",
  path: string;
} 

declare interface router {
  getBlogList: routerType;
  getBlogByTitle: routerType;
  getTags: routerType;
  getBlogTags: routerType;
  getLinks: routerType;
  getBlogComments: routerType;
  login: routerType;
  checkLogin: routerType;
  updateBlogInfo: routerType;
  uploadSingleBlog: routerType;
  deleteSingleBlog: routerType;
  deleteSingleTag: routerType;
  addSingleTag: routerType;
  addSingleLink: routerType;
  deleteSingleLink: routerType;
  getAllDates: routerType;
}




