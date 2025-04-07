import { z } from "zod";
import { stringField } from "./global.schema";

export const blogSchema = z.object({
    title: stringField("Title"),
    slug: stringField("Slug"),
    content: stringField("Content"),
    imageLink: stringField("Image Link"),
    date: stringField("Date"),
    date_readable: stringField("Date Readable"),
});
export type TBlog = z.infer<typeof blogSchema>;