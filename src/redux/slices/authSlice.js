import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuth: false,
		authUser: {},
	},
	reducers: {
		loginUser: (state) => {
			state.isAuth = true;
		},
		logOutUser: (state) => {
			state.isAuth = false;
		},
		setAuthUser: (state, action) => {
			state.authUser = action.payload;
		},
	},
});
export default authSlice.reducer;
export const { loginUser, logOutUser, setAuthUser } = authSlice.actions;
