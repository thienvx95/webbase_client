import { Address } from 'api/common/models/address';
import { BaseModel } from 'api/common/models/baseModel';

export class UserDetail extends BaseModel {
  lastName?: string;
  username?: string;
  firstName?: string;
  email?: string;
  address?: Address;
  roles?: string[];
  avatar?: string;
  mobile?: string;
  isActive?: boolean;
}
