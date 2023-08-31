import { BaseModel } from "api/common/models/baseModel";

export class UserLoginActivity extends BaseModel {
  userId?: string;
  platform?: string;
  browser?: string;
  ipAddress?: string;
}
