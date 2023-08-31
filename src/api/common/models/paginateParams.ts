import { SortOrder } from 'antd/es/table/interface';
import { ReactText } from 'react';

export class PaginateParams {
  limit?: number;
  page?: number;
  filter?: Record<string, ReactText[] | null>;
  search?: Record<string, string>;
  sort?: Record<string, SortOrder>;
}
