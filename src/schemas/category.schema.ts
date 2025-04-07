import { z } from "zod";
import { positiveNumberField, stringField } from "./global.schema";

export const brandSchema = z.object({
    id: positiveNumberField("Id"),
    name: stringField("Name"),
    slug: stringField("Slug"),
});

export const subcategorySchema = z.object({
    id: positiveNumberField("Id"),
    name: stringField("Name"),
    slug: stringField("Slug"),
    brand: z.array(brandSchema),
});

export const categorySchema = z.object({
    id: positiveNumberField("Id"),
    name: stringField("Name"),
    slug: stringField("Slug"),
    imageLink: stringField("Image Link"),
    description: stringField("Description").nullable(),
    subcategories: z.array(subcategorySchema),
});

export type TCategory = z.infer<typeof categorySchema>;
