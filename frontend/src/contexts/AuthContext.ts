import { useAuth } from "hooks/useAuth";
import { createContext } from "react";
import { ILoginRequestDto, IUserDto } from "services/backend/nswagts";

type ContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<ContextType>({
  activeUser: null,
  authStage: 0,
  login: (loginRequest: ILoginRequestDto) => null,
  logout: () => null,
  loginWithToken: (token: string) => null
});
