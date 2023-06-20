import dashBoardConfig from "../blogDashboard";
import getAxios from "./getAxios";

const axios = getAxios();

const routers = dashBoardConfig.router;

async function basicRequest<T>(
  path: string,
  method: "post" | "get",
  params?: T
) {
  if (method === "post") {
    return await axios.post(path, params);
  } else {
    return await axios.get(path, {
      params: params,
    });
  }
}

export async function getBlogList(params: getBlogListParams) {
  return await basicRequest(
    routers.getBlogList.path,
    routers.getBlogList.method,
    params
  );
}

export async function getBlogByTitle(params: getBlogByTitleParams) {
  return await basicRequest(
    routers.getBlogByTitle.path,
    routers.getBlogByTitle.method,
    params
  );
}

export async function getTags() {
  return await basicRequest(routers.getTags.path, routers.getTags.method);
}

export async function getBlogTags(params: getBlogTagsParams) {
  return await basicRequest(
    routers.getBlogTags.path,
    routers.getBlogTags.method,
    params
  );
}

export async function getLinks() {
  return await basicRequest(routers.getLinks.path, routers.getLinks.method);
}

export async function getBlogComments(params: getBlogCommentsParams) {
  return await basicRequest(
    routers.getBlogComments.path,
    routers.getBlogComments.method,
    params
  );
}

export async function login(params: loginParams) {
  return await basicRequest(routers.login.path, routers.login.method, params);
}

export async function checkLogin() {
  return await basicRequest(routers.checkLogin.path, routers.checkLogin.method);
}

export async function deleteSingleBlog(params: deleteSingleBlogParams) {
  return await basicRequest(
    routers.deleteSingleBlog.path,
    routers.deleteSingleBlog.method,
    params
  );
}

export async function deleteSingleTag(params: deleteSingleTagParams) {
  return await basicRequest(
    routers.deleteSingleTag.path,
    routers.deleteSingleTag.method,
    params
  );
}

export async function addSingleTag(params: addSingleTagParams) {
  return await basicRequest(
    routers.addSingleTag.path,
    routers.addSingleTag.method,
    params
  );
}

export async function updateBlogInfo(formdata: FormData) {
  return await axios.post(routers.updateBlogInfo.path, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function uploadSingleBlog(formdata: FormData) {
  return await axios.post(routers.uploadSingleBlog.path, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function addSingleLink(params: addSingleLinkParams) {
  return await basicRequest(routers.addSingleLink.path, routers.addSingleLink.method, params)
}

export async function deleteSingleLink(params: deleteSingleLinkParams) {
  return await basicRequest(
    routers.deleteSingleLink.path,
    routers.deleteSingleLink.method,
    params
  );
}
