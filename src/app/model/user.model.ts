export interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  phonenumber: string;
  usertype: string;
  userId?: number;
}

export interface LoginModel {
  username: string;
  password: string;
}
