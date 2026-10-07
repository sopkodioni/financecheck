import { apiClient } from "../../../api/apiClient"
import type { User } from "../authSlice";
import type { LoginDto, RegisterDto, SendCodeDto, VerifyCodeDto } from "../types";

export const authApi = {
    sendCode: async (dto: SendCodeDto) => {
        const { data } = await apiClient.post<{success: boolean; message: string}>(
            '/auth/send-code', dto
        )

        return data
    },

    verifyCode: async (dto: VerifyCodeDto) => {
        const { data } = await apiClient.post<{ emailToken: string, message: string }>(
            '/auth/verify-code', dto
        )

        return data
    },

    register: async (dto: RegisterDto) => {
        const { data } = await apiClient.post<{ accessToken: string }>(
            '/auth/register', dto
        )

        return data
    },

    login: async (dto: LoginDto) => {
        const { data } = await apiClient.post<{ accessToken: string }>(
            '/auth/login', dto
        )

        return data
    },

    getMe: async (accessToken: string) => {
        const { data } = await apiClient.get<User>('users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data
    }
}