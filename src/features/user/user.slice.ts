import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface UserState {
  activeUsers: string[];
}

const initialState: UserState = {
  activeUsers: [],
};

type SetActiveUsersAction = {
  payload: { users: string[] };
  type: string;
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setActiveUsers: (state, action: SetActiveUsersAction) => {
      if (action.payload.users) {
        state.activeUsers = action.payload.users;
      }
    },
  },
});

export const { setActiveUsers } = userSlice.actions;

export const selectActiveUsers = (state: RootState) =>
  state.userSlice.activeUsers;

export default userSlice;
