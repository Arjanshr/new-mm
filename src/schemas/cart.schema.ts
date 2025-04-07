import { z } from "zod";
import { positiveNumberField, stringField } from "./global.schema";
import { productSchema } from "./product.schema";

export const cartSchema = z.object({
    productId: positiveNumberField("Product Id"),
    quantity: positiveNumberField("Quantity"),
    product: productSchema,
});
export type TCart = z.infer<typeof cartSchema>;