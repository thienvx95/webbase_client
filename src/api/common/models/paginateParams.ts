import { SortOrder } from 'antd/es/table/interface';
import { ReactText } from 'react';

export interface PaginateParams {
  limit?: number;
  page?: number;
  filter?: Record<string, ReactText[] | null>;
  search?: Record<string, string>;
  sort?: Record<string, SortOrder>;
}
