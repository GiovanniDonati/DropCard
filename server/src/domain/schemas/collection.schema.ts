import z from "zod";

export const CollectionSchema = z.object({
  name: z.string(),
});