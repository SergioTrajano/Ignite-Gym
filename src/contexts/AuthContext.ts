import { createContext } from "react";

import { UserDTO } from "src/dto/UserDTO";

export type AuthContextProps = {
    user: UserDTO;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export { AuthContext };
