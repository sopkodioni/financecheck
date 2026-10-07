import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
    id: string,
    name: string,
    email: string,
    passHash: string,
    createdAt: string,
    updateAt: string,
}

interface AuthState {
    user: User | null,
    token: string | null,
    isAuth: boolean,
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, token?: string }>) => {
            state.user = action.payload.user
            state.isAuth = true
            state.isLoading = false

            if(action.payload.token){
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            }
        },

        logout: (state) => {
            state.user = null,
            state.token = null,
            state.isAuth = false,
            state.isLoading = false
            localStorage.removeItem('token')
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {setCredentials, logout, setLoading} = authSlice.actions
export default authSlice.reducer