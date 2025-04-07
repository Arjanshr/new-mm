import { z } from "zod"
import { positiveNumberField, stringField } from "./global.schema"

export const brandSchema = z.object({
    id: positiveNumberField("Id"),
    slug: stringField("Slug"),
    name: stringField("Name"),
    imageLink: stringField("Image Link"),
    description: stringField("Description"),

})
export type TBrand = z.infer<typeof brandSchema>

