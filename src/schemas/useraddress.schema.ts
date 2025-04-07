import { z } from "zod";
import { stringField } from "./global.schema"; 


export const provinceSchema = z.object({
  id: stringField("Id"),
  name: stringField("Name"),
  created_at: stringField("Created At"),
  updated_at: stringField("Updated At"),
});

export const citySchema = z.object({
  id: stringField("Id"),
  province_id: stringField("Province Id"),
  name: stringField("City Name"),
  created_at: stringField("Created At"),
  updated_at: stringField("Updated At"),
});


export const areaSchema = z.object({
  id: stringField("Id"),
  city_id: stringField("City Id"),
  name: stringField("Area Name"),
  shipping_price: stringField("Shipping Price"),
  created_at: stringField("Created At"),
  updated_at: stringField("Updated At"),
});


export const addressSchema = z.object({
  id: stringField("Id"),
  name: stringField("Name"),
  type: stringField("Type"),
  province: provinceSchema,
  city: citySchema,
  area: areaSchema,
  location: stringField("Location"),
  phone_number: stringField("Phone Number"),
  is_default: stringField("Is Default"), 
});





export type TAddressData = z.infer<typeof addressSchema>;
