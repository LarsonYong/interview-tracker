export type LoginInput = {
  email: string;
  password: string;
};

export type CurrentUser = {
  id: number;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  message: string;
  user: CurrentUser;
  token: string;
};

export type CurrentUserResponse = {
  message: string;
  user: CurrentUser;
};

export type AuthContextValue = {
  user: CurrentUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};