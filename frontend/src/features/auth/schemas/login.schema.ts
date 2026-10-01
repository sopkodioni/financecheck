import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('The email must be a string.'),
    password: z.string('The password must be a string')
})

export type LoginFormData = z.infer<typeof loginSchema>