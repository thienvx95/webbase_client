import { ResponseResult } from 'api/common/models';
import { PaginateResult } from 'api/common/models/paginateResult';
import { httpClient } from 'api/httpClient';
import { RoleDetail } from './models';
import { PaginateParams } from 'api/common/models/paginateParams';

export const RoleAPIPath = {
  findPaging: `/role/paging`,
  role: `/role/`,
};

export const RoleApi = {
  async findPaging(
    request: PaginateParams,
  ): Promise<ResponseResult<PaginateResult<RoleDetail>>> {
    return await httpClient.post(RoleAPIPath.findPaging, request);
  },
  async delete(id: string): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.delete(RoleAPIPath.role + id);
  },
  async update(
    id: string,
    role: RoleDetail,
  ): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.post(RoleAPIPath.role + id, role);
  },
  async create(
    role: RoleDetail,
  ): Promise<ResponseResult<PaginateResult<boolean>>> {
    return await httpClient.put(RoleAPIPath.role, role);
  },
};
