import { isEmpty } from 'lodash';
export enum CacheKey {
  WebApiToken = 'Web/APIToken',
  WebApiRefreshhToken = 'Web/APIRefreshhToken',
  Theme = 'Theme',
}

interface ICachePersist {
  set: (key: CacheKey, object: any) => void;
  hasValue: (key: CacheKey) => boolean;
  get: <T>(key: CacheKey) => T;
  remove: (key: CacheKey) => void;
  removeAll: () => void;
}

export const LocalStorageUtil: ICachePersist = {
  set: (key, object) => {
    if (isEmpty(object)) return;
    if (typeof object === object) {
      localStorage.setItem(key, JSON.stringify(object));
    } else {
      localStorage.setItem(key, object);
    }
  },
  get: key => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    if (value[0] === '{') {
      return JSON.parse(value);
    }

    return value;
  },
  remove: key => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
  hasValue: function (key: CacheKey): boolean {
    return this.get(key) != null;
  },
};
