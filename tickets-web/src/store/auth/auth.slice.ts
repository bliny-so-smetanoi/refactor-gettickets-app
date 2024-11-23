import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import { AuthState } from './AuthState';

const initialState: AuthState = {
  token: null, 
  isAuth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
        state, 
        action: PayloadAction<{token: string}>
    ) => 
    {
        if(action.payload.token !== "{}" && action.payload.token !== undefined) {
            localStorage.setItem("user", JSON.stringify({token: action.payload.token}));
            state.token = action.payload.token;
            state.isAuth = true;
        }
    },
    logout: (
        state,
        action: PayloadAction<void>
    ) => {
        localStorage.clear();
        state.token = null;
        state.isAuth = false;
    }   
  },
  extraReducers: {},
})
export const selectAuth = (state: RootState) => state.auth;
export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer