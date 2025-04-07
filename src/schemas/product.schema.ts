import { z } from "zod";
import { stringField } from "./global.schema";

export const productSchema = z.object({
    id: stringField("Id"),
    name: stringField("Name"),
    slug: stringField("Slug"),
    rating: z.number().min(0, "Rating must be a non-negative number"),
    discounted_amount: stringField("Discounted Amount"),
    original_amount: stringField("Original Amount"),
    added_to_cart: z.boolean(),
    added_to_wishlist: z.boolean(),
    image_link: stringField("Image Link"),
    offer: z.string().nullable(),
    alt_text: z.string().nullable(),
    status: stringField("Status"),
    tags: z.object({
        new: z.boolean(),
        popular: z.boolean(),
        campaign: z.boolean(),
    }),
});

export type TProduct = z.infer<typeof productSchema>;




export const productDetailSchema = z.object({
    id: z.number().int().positive(),
    name: stringField("Name"),
    description: stringField("Description"),
    slug: stringField("Slug"),
    average_rating: z.number().int().min(0).max(5),
    discounted_amount: stringField("Discounted Amount"),
    original_amount: stringField("Original Amount"),
    added_to_cart: z.boolean(),
    added_to_wishlist: z.boolean(),
    offer: z.string().nullable(),
    status: stringField("Status"),
    images: z.array(stringField("Image Link")),
    total_reviews: z.number().int().min(0),
    rating_summary: z.object({
        Five: z.number().int().min(0),
        Four: z.number().int().min(0),
        Three: z.number().int().min(0),
        Two: z.number().int().min(0),
        One: z.number().int().min(0),
    }),
    category_id: z.number().int().positive(),
    alt_text: stringField("Alt Text"),
    tags: z.object({
        new: z.boolean(),
        popular: z.boolean(),
        campaign: stringField("Campaign"),
    }),
    variants: z.array(z.unknown()),
});

export type TProductDetail = z.infer<typeof productDetailSchema>;

export const productSpecificationSchema = z.object({
    key: stringField("Key"),
    value: stringField("Value"),

});

export type TProductSpecification = z.infer<typeof productSpecificationSchema>;