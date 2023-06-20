declare interface blogInfo {
  date: string;
  des: string;
  file: string;
  id: number;
  picture: string;
  title: string;
}

declare interface tagInfo {
  id: number;
  name: string;
}

declare interface staticLink {
  name: string;
  url: string;
}

declare interface appInfo {
  name: string;
  url: string;
  logo: string;
}

declare interface commentInfo {
  name: string;
  content: string;
  id: number;
}

declare interface toastInfo {
  id: number;
  content: string;
  time: string
}