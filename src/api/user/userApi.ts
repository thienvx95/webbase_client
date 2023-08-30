import { ResponseResult } from 'api/common/models';
import { PaginateParams } from 'api/common/models/paginateParams';
import { PaginateResult } from 'api/common/models/paginateResult';
import { httpClient } from 'api/httpClient';
import { UserDetail } from './models';

export const UserAPIPath = {
  findPaging: `/user/paging`,
  user: `/user/`,
};

export const UserAPI = {
  async findPaging(
    request: PaginateParams,
  ): Promise<ResponseResult<PaginateResult<UserDetail>>> {
    return await httpClient.post(UserAPIPath.findPaging, request);
  },
  async delete(id: string): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.delete(UserAPIPath.user + id);
  },
  async update(id: string): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.post(UserAPIPath.user);
  },
  async create(id: string): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.put(UserAPIPath.user);
  },
};
