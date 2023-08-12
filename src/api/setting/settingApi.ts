import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { BaseSettingPage } from './models/baseSettingPage';
import { PageSettingEnum } from './models/pageSettingEnum';

const SettingPageAPIPath = {
  getSettingPage: `setting/getSettingPage/`,
};

export const SettingPageAPI = {
  async getSettingPage(
    page: PageSettingEnum,
  ): Promise<ResponseResult<BaseSettingPage>> {
    return await httpClient.get(
      `${SettingPageAPIPath.getSettingPage}${page.toString()}`,
    );
  },
};
