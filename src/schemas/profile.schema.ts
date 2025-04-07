import { z } from "zod"
import { emailField, stringField } from "./global.schema"

export const profileSchema = z.object({
    id: stringField("Id"),
    name: stringField("Name"),
    email: emailField("Email"),
    number: stringField("Phone No.").optional().nullable(),
    birthday: stringField("Date of Birth"),
    gender: stringField("Gender"),
    profile_image_path: stringField("Image"),



})
export type TProfile = z.infer<typeof profileSchema>


export const profileEditSchema = z.object({
    name: stringField("Name"),
    email: emailField("Email"),
    phone: stringField("Phone No.").optional().nullable(),
    dob: stringField("Date of Birth"),
    gender: stringField("Gender"),
});
export type TProfileEditSchema = z.infer<typeof profileEditSchema>