import { z } from "zod";
import { stringField } from "./global.schema";
import { productSchema } from "./product.schema";

export const campaignSchema = z.object({
    id: z.number(),
    name: stringField("Name"),
    color_theme: stringField("Color Theme"),
    background_image: stringField("Background Image"),
    start_date: stringField("Start date"),
    end_date: stringField("End date"),

    time_since_started: stringField("Time Since Started"),
    time_until_expiry: stringField("Time Until Expiry"),
    products: z.array(productSchema).optional()
});
export type TCampaign = z.infer<typeof campaignSchema>;