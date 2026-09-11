import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { User } from "./auth.interface";
import authApi from "./auth.api";

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

type SaveTokenAction = {
  payload: { accessToken: string };
  type: string;
};

type SaveUserAction = {
  payload: { user: User };
  type: string;
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveToken: (state, action: SaveTokenAction) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
    },
    saveUser: (state, action: SaveUserAction) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, action) => {
        if (action.payload.success && action.payload.data?.user) {
          state.user = action.payload.data.user;
        }
      },
    );
  },
});

export const selectAccessToken = (state: RootState) =>
  state.authSlice.accessToken;

export const selectUser = (state: RootState) => state.authSlice.user;

export const { saveToken, saveUser } = authSlice.actions;

export default authSlice;
