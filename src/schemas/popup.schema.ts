import { z } from "zod";
import { stringField } from "./global.schema";

export const popupSchema = z.object({
    id: stringField("Id"),
    image_url: stringField("Image URL"),
    is_active: z.boolean().or(z.number().int().min(0).max(1)),
    created_at: stringField("Created At").nullable(),
    updated_at: stringField("Updated At")
});

export type TPopup = z.infer<typeof popupSchema>;
