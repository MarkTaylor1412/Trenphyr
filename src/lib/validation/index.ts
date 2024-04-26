import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
    email: z.string().email(),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

export const PostValidation = z.object({
    caption: z.string().min(3, { message: "Caption must be at least 3 characters." }).max(2200),
    file: z.custom<File[]>(),
    location: z.string(),
    tags: z.string(),
})
