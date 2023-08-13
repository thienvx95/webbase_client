import { isEmpty } from 'lodash';
export enum CacheKey {
  WebApiToken = 'Web/APIToken',
  WebApiRefreshhToken = 'Web/APIRefreshhToken',
  Theme = 'Theme',
  ThemeSetting = 'ThemeSetting',
}

interface ICachePersist {
  set: (key: CacheKey, object: any, isRemember?: boolean) => void;
  hasValue: (key: CacheKey) => boolean;
  get: <T>(key: CacheKey) => T;
  remove: (key: CacheKey) => void;
  removeAll: () => void;
}

export const StorageUtil: ICachePersist = {
  set: (key, object, isRemember = false) => {
    if (isEmpty(object)) return;
    let data = object;
    if (typeof object === object) {
      data = JSON.stringify(object);
    }
    if (isRemember) {
      localStorage.setItem(key, data);
    } else {
      sessionStorage.setItem(key, data);
    }
  },
  get: key => {
    const value = localStorage.getItem(key) || sessionStorage.getItem(key);
    if (!value) return null;
    if (value[0] === '{') {
      return JSON.parse(value);
    }

    return value;
  },
  remove: key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
  removeAll: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
  hasValue: function (key: CacheKey): boolean {
    return this.get(key) != null;
  },
};
