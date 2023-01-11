export interface UserProfile {
  sub: string;
  id: string;
  fullname: string;
  email: string;
  roles: string[];
  avatar: string;
  username: string;
  gender: string;
  address: string;
  dob: Date;
  mobile?: string;
}
