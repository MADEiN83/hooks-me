const storageMock = (() => {
  let store = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "sessionStorage", { value: storageMock });
Object.defineProperty(window, "localStorage", { value: storageMock });
