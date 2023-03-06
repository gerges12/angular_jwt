export interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  username: string;
  expiresAt: string;
  userid: string;
  accountId: string;
  userType: string;
}
