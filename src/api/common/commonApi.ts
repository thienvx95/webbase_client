import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { MenuResult } from './models/menuResult';

export const CommonAPIPath = {
  fetchMenu: `/menu/getCurrentMenu`,
};

export const CommonAPI = {
  async fetchMenu(): Promise<ResponseResult<MenuResult[]>> {
    return await httpClient.get(CommonAPIPath.fetchMenu);
  },
};
