import { z } from "zod";
import { positiveNumberField, stringField } from "./global.schema";

export const orderAddressSchema = z.object({
    id: positiveNumberField("Id"),
    name: stringField("Name"),
});
export type TOrderAddress = z.infer<typeof orderAddressSchema>;

export const shippingPriceSchema = z.object({
    shipping_price: stringField("Shipping Price"),
});
export type TShippingPrice = z.infer<typeof shippingPriceSchema>;