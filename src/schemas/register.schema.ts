import { z } from "zod"
import { booleanField, emailField, passwordField, positiveNumberField, stringField } from "./global.schema"




export const registerSchema = z.object({
    name: stringField("Name"),
    email: emailField("Email"),
    phone: stringField("Phone No.").optional().nullable(),
    dob: stringField("Date of Birth"),
    gender: stringField("Gender"),
    password: passwordField("Password"),
    password_confirmation: passwordField("Confirm Password"),
}).refine(data => data.password === data.password_confirmation, {
    message: "Password mismatched",
    path: ["password_confirmation"],
});
export type TRegister = z.infer<typeof registerSchema>