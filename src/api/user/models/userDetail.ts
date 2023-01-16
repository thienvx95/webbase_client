import { Address } from 'api/common/models/address';

export interface UserDetail {
  _id?: string;

  lastName?: string;

  username?: string;

  firstName?: string;

  email?: string;

  address?: Address;

  roles?: string[];

  avatar?: string;

  mobile?: string;

  isActive?: boolean;

  password: string;
}
