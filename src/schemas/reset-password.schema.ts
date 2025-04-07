import { z } from "zod"
import { booleanField, emailField, stringField } from "./global.schema"

export const resetpasswordSchema = z.object({
    email: emailField("email"),
    token: stringField("Token"),
    password: stringField("Password"),
    password_confirmation: stringField("Confirm Password")
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords mismatched",
    path: ["password_confirmation"],
});
export type TResetpassword = z.infer<typeof resetpasswordSchema>