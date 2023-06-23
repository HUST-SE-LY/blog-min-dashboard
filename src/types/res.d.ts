declare interface getBlogRes {
  data: {
    blogs: Array<blogInfo>;
  };
}

declare interface getBlogTagRes {
  data: {
    tags: Array<tagInfo>;
  };
}

declare interface getTagsRes {
  data: {
    tags: Array<tagInfo>;
  }
}

declare interface getLinksRes {
  data: {
    links: Array<linkInfo>
  }
}

declare interface getAllDatesRes {
  data: {
    dates: Array<dateInfo>
  }
}

declare interface getCommentsRes {
  data: {
    list: commentInfo[];
  }
}

declare interface loginRes {
  data: {
    success: boolean;
    token: string;
  }
}

declare interface checkLoginRes {
  data: {
    success: boolean;
  }
}

declare interface getFriendLinkListRes {
  data: {
    list: friendLinkInfo[];
  }
}

