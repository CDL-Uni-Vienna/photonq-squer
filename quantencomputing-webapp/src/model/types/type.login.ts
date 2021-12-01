export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 *
 */
export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

/**
 * Response returned by the server after a successful login.
 */
export interface LoginResponse {
  expires: string;
  token: string;
  id: 3;
  name: string;
  username: string;
}