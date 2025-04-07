import { z } from "zod";
import { stringField } from "./global.schema";



export const wishlistSchema = z.object({
  id: stringField("Id"),
  name: stringField("Name"),
  type: stringField("Type"),
  location: stringField("Location"),
  phone_number: stringField("Phone Number"),
  is_default: stringField("Is Default"),
});





export type TWishlist = z.infer<typeof wishlistSchema>;
