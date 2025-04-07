import { z } from "zod"
import { booleanField, emailField, stringField } from "./global.schema"

export const changepasswordSchema = z.object({
    password: stringField("Old Password"),
    new_password: stringField("New Password"),
    new_password_confirmation: stringField("Confirm Password")
}).refine(data => data.new_password === data.new_password_confirmation, {
    message: "Passwords mismatched",
    path: ["new_password_confirmation"],
});
export type TChangepassword = z.infer<typeof changepasswordSchema>