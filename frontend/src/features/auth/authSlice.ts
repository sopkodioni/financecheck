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
    accessToken: string | null,
    isAuth: boolean,
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    isAuth: false,
    isLoading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, accessToken?: string }>) => {
            state.user = action.payload.user
            state.isAuth = true
            state.isLoading = false

            if(action.payload.accessToken){
                state.accessToken = action.payload.accessToken
                localStorage.setItem('accessToken', action.payload.accessToken)
            }
        },

        logout: (state) => {
            state.user = null,
            state.accessToken = null,
            state.isAuth = false,
            state.isLoading = false
            localStorage.removeItem('accessToken')
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {setCredentials, logout, setLoading} = authSlice.actions
export default authSlice.reducer