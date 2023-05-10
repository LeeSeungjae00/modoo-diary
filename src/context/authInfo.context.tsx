"use client";
import apiClient from "@/api/modooClient";
import { ACCESS_TOKEN_KEY } from "@/lib/authUtill";
import React, { Dispatch, createContext, useEffect, useReducer } from "react";

type StateType = {
  isLogin: boolean;
};

type ActionType<T> = {
  type: string;
  payload: T;
};

const initialState: StateType = {
  isLogin: false,
};

const reducer = (state: StateType, action: ActionType<boolean>) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, isLogin: action.payload };
    case "SIGNOOUT":
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType<boolean>>;
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
      dispatch({ type: "SIGNIN", payload: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
