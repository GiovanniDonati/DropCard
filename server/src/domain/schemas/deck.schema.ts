import z from "zod";

export const DeckSchema = z.object({
  name: z.string(),
});
