import { z } from "zod"
import { positiveNumberField, stringField } from "./global.schema"

export const sliderSchema = z.object({
    title: stringField("Title").optional().nullable(),
    link_url: stringField("Link Url").optional().nullable(),
    display_order: positiveNumberField("Display Order"),
    imageLink: stringField("Image Link"),

})
export type TSlider = z.infer<typeof sliderSchema>