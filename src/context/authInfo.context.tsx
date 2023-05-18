"use client";
import apiClient from "@/api/modooClient";
import { ACCESS_TOKEN_KEY } from "@/lib/authUtill";
import { AccessTokenPayload } from "@/types/auth";
import jwtDecode from "jwt-decode";
import React, { Dispatch, createContext, useEffect, useReducer } from "react";

type StateType = {
  isLogin: AccessTokenPayload | undefined;
};

type ActionType<T> = {
  type: string;
  payload: T;
};

const initialState: StateType = {
  isLogin: undefined,
};

const reducer = (
  state: StateType,
  action: ActionType<AccessTokenPayload | undefined>
) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, isLogin: action.payload };
    case "SIGNOOUT":
      return { ...state, isLogin: undefined };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType<AccessTokenPayload | undefined>>;
}>({ state: initialState, dispatch: () => null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      const payload = jwtDecode<AccessTokenPayload>(accessToken);
      dispatch({ type: "SIGNIN", payload });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
