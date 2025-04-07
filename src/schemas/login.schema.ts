import { z } from "zod"
import { booleanField, emailField, passwordField, stringField } from "./global.schema"

export const loginResponseSchema = z.object({
    name: stringField("Name"),

    token: stringField("Token"),

})
export type TLoginResponse = z.infer<typeof loginResponseSchema>

export const loginSchema = z.object({
    email: emailField("Email"),
    password: passwordField("Password"),

})
export type TLogin = z.infer<typeof loginSchema>