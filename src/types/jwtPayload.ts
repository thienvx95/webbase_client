export interface JwtPayload {
  sub: string;
  fullname: string;
  email: string;
  roles: string[];
  avatar: string;
  exp?: number;
  iat?: number;
}
