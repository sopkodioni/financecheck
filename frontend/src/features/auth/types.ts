export type RegisterStep = 'EMAIL' | 'CODE' | 'CREDENTIALS'

export type SendCodeDto = { email: string }
export type VerifyCodeDto = { email: string, enteredCode: string }
export type RegisterDto = { name: string, password: string, emailToken: string }
export type LoginDto = { email: string, password: string }