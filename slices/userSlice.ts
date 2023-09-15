import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store/store";

export interface userState {
  userState: {
    email: string;
    password: string;
  };
}

const initialState: userState = {
  userState: {
    email: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSave(state, action) {
      state.userState.email = action.payload.email;
      state.userState.password = action.payload.password;
    },

    userLogout(state) {
      state.userState.email = "";
      state.userState.password = "";
    },
  },
});

export const { userSave, userLogout } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user.userState;

export default userSlice.reducer;
