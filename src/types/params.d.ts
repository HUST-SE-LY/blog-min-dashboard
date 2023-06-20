declare interface getBlogListParams {
  limit: number;
  offset: number;
}

declare interface getBlogByTitleParams {
  limit: number;
  offset: number;
  title: string;
}

declare interface getBlogTagsParams {
  id: number;
}

declare interface getLinksParams {
  limit: number;
  offset: number;
}

declare interface getBlogCommentsParams {
  limit: number;
  offset: number;
  blog: number;
}

declare interface loginParams {
  password: string;
}

declare interface deleteSingleBlogParams {
  id: number;
}

declare interface deleteSingleTagParams {
  id: number;
}

declare interface addSingleTagParams {
  name: string;
}
