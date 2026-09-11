import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

type SaveTokenAction = {
  payload: { accessToken: string };
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
  },
});

export const selectAccessToken = (state: RootState) =>
  state.authSlice.accessToken;

export const { saveToken } = authSlice.actions;

export default authSlice;
