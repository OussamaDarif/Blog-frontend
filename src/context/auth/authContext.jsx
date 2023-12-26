import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { getAuthUser } from "../../graphql/utils";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: Object.values(getAuthUser()).every(prop => prop === null) ? null : getAuthUser(),
  };


  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
