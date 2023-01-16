export interface JwtPayload {
  id: string;
  fullname: string;
  email: string;
  roles: string[];
  avatar: string;
  exp?: number;
  iat?: number;
}
