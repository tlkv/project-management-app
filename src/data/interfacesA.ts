export interface ApiUserInfo {
  login: string;
  id: string;
  name: string;
}

export interface ApiUserQuery {
  name: string;
  login: string;
  password: string;
}

export interface jwtToken {
  iat: number;
  login: string;
  userId: string;
}
