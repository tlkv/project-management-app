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

export interface JwtToken {
  iat: number;
  login: string;
  userId: string;
}

export interface ModalConfirmation {
  toggleModal: () => void;
  message: string;
}
