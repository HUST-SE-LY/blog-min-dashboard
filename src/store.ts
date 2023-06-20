import { makeAutoObservable } from "mobx";
class Store {
  isLogin = false;
  toastId = 0;
  toastList: toastInfo[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.isLogin = true;
  }

  logout() {
    this.isLogin = false;
  }

  addToast(content: string) {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    this.toastList.push({
      id: this.toastId,
      content: content,
      time: `${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }`,
    });
    this.toastId += 1;
  }

  deleteToast(id: number) {
    this.toastList = this.toastList.filter((toast) => toast.id !== id);
  }
}

const store = new Store();

export default store;
