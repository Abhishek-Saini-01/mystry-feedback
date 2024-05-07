import { z } from "zod";

export const usernameValidation = z.string().min(3,"Username must be atleat 3 characters").max(20,"Username must be no more 20 characters").regex(/^[a-zA-Z0-9_]+$/,"Username must not contain any special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password should be atleast 6 characters"})
})