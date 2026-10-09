import { z } from "zod"

export const emailStepSchema = z.object({
    email: z.email('The email address is invalid')
        .min(1, 'Enter your email')
        .max(255, 'Email is too long')
})

export const codeStepSchema = z.object({
    code: z.array(z.string())
        .length(4, 'Incorrect code')
        .refine(arr => arr.every(digit => digit.trim() !== ''), {
            message: 'Please fill in all code fields'
        })
})

export const credentialsStepSchema = z.object({
    name: z.string()
        .min(2, 'The name must contain at least two characters')
        .max(40, 'The name must contain no more than forty characters')
        .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/, 'Name can only contain letters and spaces'),

    password: z.string()
        .min(8, 'Password must contain at least 8 characters')
        .regex(/[a-z]/, 'The password must contain at least one lowercase character')
        .regex(/[A-Z]/, 'The password must contain at least one uppercase character')
        .regex(/[0-9]/, 'The password must contain at least one digit'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
})
.refine(data => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword']
})

export const baseRegisterSchema = emailStepSchema
    .extend(codeStepSchema.shape)
    .extend(credentialsStepSchema.shape)

export const registerSchema = baseRegisterSchema.refine(
    data => data.password === data.confirmPassword,
    {
        message: "Password don't match",
        path: ['confirmPassword'],
    }
)

export type RegisterFormData = z.infer<typeof registerSchema>