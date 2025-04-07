import { z } from "zod"
import { emailField, stringField } from "./global.schema"

export const forgotpasswordSchema = z.object({
    email: emailField("Email"),
    reset_url: stringField("Email"),

})
export type TForgotpassword = z.infer<typeof forgotpasswordSchema>